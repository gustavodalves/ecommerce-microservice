import DomainEvent from './domain-event';
import Entity from './entity';
import UUID from './object-values/uuid';

export default abstract class AggregateRoot extends Entity {
    protected events: DomainEvent[] = [];

    getEvents() {
        return this.events;
    }

    clearEvents() {
        this.events = [];
    }

    addEvent(event: DomainEvent) {
        this.events.push(event);
    }

    constructor(
        id?: string | UUID
    ) {
        super(id);
    }
}
