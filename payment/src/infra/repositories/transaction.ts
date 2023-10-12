import { PrismaClient } from '@prisma/client';
import { TransactionRepository } from '../../domain/repositories/Transaction';
import Transaction from '../../domain/entities/Transaction';

export default class PrismaTransactionRepository implements TransactionRepository {
    constructor(
        private readonly prismaClient: PrismaClient
    ) {}

    async save(transaction: Transaction): Promise<void> {
        await this.prismaClient.transaction.create({
            data: {
                id: transaction.id.getValue(),
                orderId: transaction.orderId.getValue(),
                price: transaction.price,
                status: transaction.status
            }
        });
    }
}
