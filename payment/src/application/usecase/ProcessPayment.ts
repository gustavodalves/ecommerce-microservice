import UUID from '../../core/building-blocks/object-values/uuid';
import Transaction from '../../domain/entities/Transaction';
import { TransactionRepository } from '../../domain/repositories/Transaction';
import PaymentGateway from '../gateways/Payment';

export default class ProcessPayment {
    constructor (
        private readonly transactionRepository: TransactionRepository,
        private readonly paymentGateway: PaymentGateway,
    ) {}

    async execute (input: Input): Promise<Output> {
        const output = await this.paymentGateway.createTransaction({ creditCardToken: input.creditCardToken, price: input.price });
        const transaction = Transaction.create(new UUID(input.orderId), output.tid, input.price, output.status);
        await this.transactionRepository.save(transaction);

        return {
            status: output.status,
            tid: output.tid,
            price: input.price
        };
    }
}

type Input = {
	orderId: string,
	price: number,
	creditCardToken: string
}

type Output = {
	status: number,
	tid: string,
	price: number
}
