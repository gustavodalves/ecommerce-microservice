import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';
import { TransactionStatus } from '../entities/Transaction';

export default class OrderCreated implements DomainEvent {
    occurredOn = new Date();
    eventVersion = 1;
    name = 'OrderCreated';

    constructor (
        readonly aggregateId: string,
        readonly price: number,
        readonly status: TransactionStatus,
        readonly creditCardToken: string,
        readonly orderId: UUID,
    ) {}
}
