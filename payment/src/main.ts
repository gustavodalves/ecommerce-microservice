import ProcessPayment from './application/usecase/ProcessPayment';
import { DomainEventManagerAdapter } from './infra/event/EventManager';
import QueueController from './infra/queue/QueueController';
import RabbitMQQueueAdapter from './infra/queue/RabbitMQQueueAdapter';
import FakePaymentGateway from './infra/gateways/payment/fake';
import FakeTransactionRepository from './infra/repositories/transaction';

async function main () {
    const queue = new RabbitMQQueueAdapter();
    await queue.connect();
    const paymentGateway = new FakePaymentGateway();
    const transactionRepository = new FakeTransactionRepository();
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
