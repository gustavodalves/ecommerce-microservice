import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';
import { TransactionStatus } from '../entities/Transaction';

export default class PaymentRecused implements DomainEvent {
    occurredOn = new Date();
    eventVersion = 1;

    constructor (
        readonly aggregateId: UUID,
        readonly price: number,
        readonly status: TransactionStatus,
        readonly orderId: UUID,
    ) {}
}
