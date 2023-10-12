import ProcessPayment from './application/usecase/ProcessPayment';
import { DomainEventManagerAdapter } from './infra/event/EventManager';
import QueueController from './infra/queue/QueueController';
import RabbitMQQueueAdapter from './infra/queue/RabbitMQQueueAdapter';
import FakePaymentGateway from './infra/gateways/payment/fake';
import FakeTransactionRepository from './infra/repositories/transaction';
import { PrismaClient } from '@prisma/client';
import PrismaTransactionRepository from './infra/repositories/transaction';

async function main () {
    const queue = new RabbitMQQueueAdapter();
    await queue.connect();
    const paymentGateway = new FakePaymentGateway();

    const prismaClient = new PrismaClient({ log: ['query']});
    const transactionRepository = new PrismaTransactionRepository(prismaClient);
    const eventManager = new DomainEventManagerAdapter(queue);

    const processPayment = new ProcessPayment(
        transactionRepository,
        paymentGateway,
        eventManager
    );

    new QueueController(
        queue,
        processPayment
    );
}

main();
