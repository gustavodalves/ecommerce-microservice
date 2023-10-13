import AggregateRoot from '../../core/building-blocks/aggregate-root';
import DomainEvent from '../../core/building-blocks/domain-event';

export default interface DomainEventManager {
    register(event: DomainEvent, handler: any): void
    publish(aggregateRoot: AggregateRoot): Promise<void>
}
