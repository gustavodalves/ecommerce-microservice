import AggregateRoot from '../../core/building-blocks/aggregate-root';
import DomainEvent from '../../core/building-blocks/domain-event';
import Queue from '../gateways/Queue';

export class DomainEventManager {
    constructor(private readonly queue: Queue){}

    register(event: DomainEvent, handler: Function) {
        this.queue.on(event, handler);
    }

    async publish(aggregateRoot: AggregateRoot) {
        for (const event of aggregateRoot.getEvents()) {
            await this.queue.publish(event);
        }
    }
}
