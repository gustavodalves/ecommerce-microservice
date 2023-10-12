import AggregateRoot from '../../core/building-blocks/aggregate-root';
import UUID from '../../core/building-blocks/object-values/uuid';
import PaymentApproved from '../events/PaymentApproved';
import PaymentRecused from '../events/PaymentRecused';

export enum TransactionStatus {
    CONFIRMED,
    RECUSED,
}

export default class Transaction extends AggregateRoot {
    private constructor (readonly id: UUID, readonly orderId: UUID, readonly tid: string, readonly price: number, public status: TransactionStatus) {
        super();
    }

    static create (orderId: UUID, tid: string, price: number, status: TransactionStatus) {
        return new Transaction(new UUID(), orderId, tid, price, status);
    }

    approve() {
        this.status = TransactionStatus.CONFIRMED;
        this.addEvent(
            new PaymentApproved(
                this.id,
                this.price,
                this.status,
                this.orderId
            )
        );
    }

    recuse() {
        this.status = TransactionStatus.RECUSED;
        this.addEvent(
            new PaymentRecused(
                this.id,
                this.price,
                this.status,
                this.orderId
            )
        );
    }
}
