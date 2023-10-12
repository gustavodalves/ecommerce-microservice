import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';
import { OrderStatus } from '../entities/order';

export default class OrderCreated implements DomainEvent {
    public readonly eventVersion = 1;
    public readonly occurredOn = new Date();
    public readonly eventName = 'OrderCancelled';

    constructor(
        public readonly aggregateId: string,
        public readonly amount: number,
        public readonly status: OrderStatus,
        public readonly total: number
    ) {}
}
