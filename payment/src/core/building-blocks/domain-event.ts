import UUID from './object-values/uuid';

export default interface DomainEvent {
    eventVersion: number
    occurredOn: Date
    aggregateId: UUID
}
