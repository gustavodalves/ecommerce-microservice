import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';

export default class PriceChangedProduct implements DomainEvent {
    public readonly eventVersion = 1;
    public readonly occurredOn = new Date();
    public readonly eventName = 'PriceChangedProduct';

    constructor(
        public readonly aggregateId: string,
        public readonly price: number
    ) {}
}
