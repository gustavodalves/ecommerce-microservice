import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';

export default class CreateProduct implements DomainEvent {
    public readonly eventVersion = 1;
    public readonly occurredOn = new Date();
    public readonly eventName = 'CreateProduct';

    constructor(
        public readonly aggregateId: string,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number
    ) {}
}
