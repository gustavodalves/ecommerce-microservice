import express, { Request, Response } from 'express';
import QueueController from './infra/queue/QueueController';
import RabbitMQQueueAdapter from './infra/queue/RabbitMQQueueAdapter';
import FakeOrderRepository from './infra/repositories/fakes/OrderRepository';
import FakeProductRepository from './infra/repositories/fakes/ProductRepository';
import OrderPaymentProcessed from './application/usecase/OrderPaymentProcessed';
import CreateOrder from './application/usecase/CreateOrder';
import { DomainEventManagerAdapter } from './infra/event/EventManager';
import PurchaseOrder from './application/usecase/PurchaseOrder';
import { PrismaClient } from '@prisma/client';
import PrismaOrderRepository from './infra/repositories/prisma/OrderRepository';
import PrismaProductRepository from './infra/repositories/prisma/ProductRepository';

async function main () {
    const app = express();
    app.use(express.json());
    const queue = new RabbitMQQueueAdapter();
    await queue.connect();

    const eventManager = new DomainEventManagerAdapter(queue);
    const prismaClient = new PrismaClient({ log: ['query'] });

    const orderRepository = new PrismaOrderRepository(prismaClient);
    const productRepository = new PrismaProductRepository(prismaClient);

    const orderPaymentProcessed = new OrderPaymentProcessed(
        orderRepository,
        eventManager
    );

    const createOrder = new CreateOrder(
        orderRepository,
        productRepository,
        eventManager,
    );

    const purchaseOrder = new PurchaseOrder(
        orderRepository,
        eventManager,
    );

    new QueueController(queue, orderPaymentProcessed);

    app.post('/create-order', async (req: Request, res: Response) => {
        const output = await createOrder.execute(req.body);
        res.json(output);
    });

    app.post('/purchase-order', async (req: Request, res: Response) => {
        const output = await purchaseOrder.execute(req.body);
        res.json(output);
    });

    app.listen(3000);
}

main();
