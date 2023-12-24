import { DomainEvent } from "../events/domain-event";
import { UUID } from "./uuid";

export abstract class AggregateRoot {
    protected events: DomainEvent[] = []

    constructor(
        readonly uuid: UUID
    ) {}

    getEvents() {
        return this.events
    }

    registerEvent(...domainEvents: DomainEvent[]) {
        for (const domainEvent of domainEvents) {
            this.events.push(domainEvent)
        }
    }  
}