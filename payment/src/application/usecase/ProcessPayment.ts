import UUID from '../../core/building-blocks/object-values/uuid';
import Transaction from '../../domain/entities/Transaction';
import PaymentApproved from '../../domain/events/PaymentApproved';
import { TransactionRepository } from '../../domain/repositories/Transaction';
import PaymentGateway from '../gateways/Payment';
import Queue from '../gateways/Queue';

export default class ProcessPayment {


    constructor (
        private readonly transactionRepository: TransactionRepository,
        private readonly paymentGateway: PaymentGateway,
        private readonly queue: Queue,
    ) {

    }

    async execute (input: Input): Promise<void> {
        const output = await this.paymentGateway.createTransaction({ creditCardToken: input.creditCardToken, price: input.price });
        const transaction = Transaction.create(new UUID(input.orderId), output.tid, input.price, output.status);
        await this.transactionRepository.save(transaction);

        for (const event of transaction.getEvents()) {
            this.queue.publish(event);
        }
    }
}

type Input = {
	orderId: string,
	price: number,
	creditCardToken: string
}

type Output = {
	status: string,
	tid: string,
	price: number
}
