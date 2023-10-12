import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';
import { OrderStatus } from '../entities/order';

export default class ProcessPayment implements DomainEvent {
    readonly eventVersion: number = 1;
    readonly occurredOn = new Date();
    readonly eventName = 'ProcessPayment';

    constructor(
        readonly aggregateId: string,
        readonly status: OrderStatus
    ) {}
}
