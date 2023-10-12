import DomainEvent from '../../core/building-blocks/domain-event';
import UUID from '../../core/building-blocks/object-values/uuid';

export default class CreateProduct implements DomainEvent {
    eventVersion = 1;
    public readonly occurredOn = new Date();

    constructor(
        public readonly aggregateId: UUID,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number
    ) {}
}
