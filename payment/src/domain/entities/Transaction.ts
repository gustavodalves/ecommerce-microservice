import AggregateRoot from '../../core/building-blocks/aggregate-root';
import UUID from '../../core/building-blocks/object-values/uuid';
import PaymentProcessed from '../events/PaymentProcessed';

export enum TransactionStatus {
    CONFIRMED = 1,
    RECUSED = 2,
}

export default class Transaction extends AggregateRoot {
    private constructor (readonly id: UUID, readonly orderId: UUID, readonly tid: string, readonly price: number, public status: TransactionStatus) {
        super();
    }

    static create (orderId: string, tid: string, price: number, status: TransactionStatus) {
        return new Transaction(new UUID(), new UUID(orderId), tid, price, status);

    }

    approve() {
        this.status = TransactionStatus.CONFIRMED;
        this.addEvent(
            new PaymentProcessed(
                this.id.getValue(),
                this.price,
                this.status,
                this.orderId.getValue()
            )
        );
    }

    recuse() {
        this.status = TransactionStatus.RECUSED;
        this.addEvent(
            new PaymentProcessed(
                this.id.getValue(),
                this.price,
                this.status,
                this.orderId.getValue()
            )
        );
    }
}
