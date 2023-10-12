import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';
import { OrderStatus } from '../entities/order';

export default class OrderCreated implements DomainEvent {
    eventVersion = 1;
    public readonly occurredOn = new Date();

    constructor(
        public readonly aggregateId: UUID,
        public readonly amount: number,
        public readonly status: OrderStatus,
        public readonly total: number
    ) {}
}
