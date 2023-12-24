import { UUID } from "../entities/uuid";

export abstract class DomainEvent {
    protected occurredDate = new Date()
    abstract readonly eventName: string

    constructor(
        protected uuid: UUID,
    ) {}
}
