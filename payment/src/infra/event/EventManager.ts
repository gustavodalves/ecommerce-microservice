import Queue from '../Queue/queue';
import AggregateRoot from '../../core/building-blocks/aggregate-root';
import DomainEvent from '../../core/building-blocks/domain-event';
import DomainEventManager from '../../domain/service/EventManager';

export class DomainEventManagerAdapter implements DomainEventManager {
    constructor(
        private readonly queue: Queue
    ) {}

    register(event: DomainEvent, handler: any) {
        this.queue.on(event.name, handler);
    }

    async publish(aggregateRoot: AggregateRoot) {
        for (const event of aggregateRoot.getEvents()) {
            await this.queue.publish(event);
        }

        aggregateRoot.clearEvents();
    }
}
