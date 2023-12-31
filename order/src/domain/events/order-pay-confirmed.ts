import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';
import { OrderStatus } from '../entities/order';

export class OrderPayConfirmed implements DomainEvent {
    readonly eventVersion: number = 1;
    readonly occurredOn = new Date();
    public readonly eventName = 'OrderPayConfirmed';

    constructor(
        readonly aggregateId: string,
        readonly status: OrderStatus
    ) {}
}
