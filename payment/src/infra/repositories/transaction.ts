import Transaction from '../../domain/entities/Transaction';
import { TransactionRepository } from '../../domain/repositories/Transaction';

export default class FakeTransactionRepository implements TransactionRepository {
    private readonly data: Transaction[] = [];

    async save(transaction: Transaction): Promise<void> {
        this.data.push(transaction);
    }
}
