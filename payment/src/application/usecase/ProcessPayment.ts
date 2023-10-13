import DomainService from '../../domain/service/DomainService';
import DomainEventManager from '../../domain/service/EventManager';
import Transaction from '../../domain/entities/Transaction';
import { TransactionRepository } from '../../domain/repositories/Transaction';
import PaymentGateway from '../gateways/Payment';

export default class ProcessPayment {
    constructor (
        private readonly transactionRepository: TransactionRepository,
        private readonly paymentGateway: PaymentGateway,
        private readonly eventManager: DomainEventManager
    ) {}

    async execute (input: Input) {
        const output = await this.paymentGateway.createTransaction({
            creditCardToken: input.creditCardToken,
            price: input.price
        });

        const transaction = Transaction.create(input.orderId, output.tid, input.price, output.status);
        const domainService = new DomainService(
            this.eventManager,
            transaction
        );

        output.status === 1 ? transaction.approve() : transaction.recuse();
        await this.transactionRepository.save(transaction);

        await domainService.finish();
    }
}

type Input = {
	orderId: string,
	price: number,
	creditCardToken: string
}
