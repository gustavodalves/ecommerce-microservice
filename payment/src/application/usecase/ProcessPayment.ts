import DomainService from '../../domain/application/DomainService';
import DomainEventManager from '../../domain/application/EventManager';
import Transaction from '../../domain/entities/Transaction';
import { TransactionRepository } from '../../domain/repositories/Transaction';
import PaymentGateway from '../gateways/Payment';

export default class ProcessPayment {
    constructor (
        private readonly transactionRepository: TransactionRepository,
        private readonly paymentGateway: PaymentGateway,
        private readonly eventManager: DomainEventManager
    ) {}

    async execute (input: Input): Promise<Output> {
        const output = await this.paymentGateway.createTransaction({
            creditCardToken: input.creditCardToken,
            price: input.price
        });

        const transaction = Transaction.create(input.orderId, output.tid, input.price, output.status);

        const domainService = new DomainService(
            this.eventManager,
            transaction
        );

        output.status === 0 ? transaction.approve() : transaction.recuse();
        await this.transactionRepository.save(transaction);
        await domainService.finish();

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
