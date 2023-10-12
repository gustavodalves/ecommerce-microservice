import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';
import { OrderStatus } from '../entities/order';

export class OrderCancelled implements DomainEvent {
    readonly eventVersion: number = 1;
    readonly occurredOn = new Date();

    constructor(
        readonly aggregateId: UUID,
        readonly status: OrderStatus
    ) {}
}
