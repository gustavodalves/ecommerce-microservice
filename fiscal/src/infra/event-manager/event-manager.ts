import { AggregateRoot } from '../../domain/entities/aggregate';
import DomainEventManager from '../../domain/event-manager';
import { DomainEvent } from '../../domain/events/domain-event';
import Queue from '../queues/queue';


export class DomainEventManagerAdapter implements DomainEventManager {
    constructor(
        private readonly queue: Queue
    ) {}

    register(event: DomainEvent, handler: any) {
        this.queue.on(event.eventName, handler);
    }

    async publish(aggregateRoot: AggregateRoot) {
        for (const event of aggregateRoot.getEvents()) {
            await this.queue.publish(event);
        }
    }
}
