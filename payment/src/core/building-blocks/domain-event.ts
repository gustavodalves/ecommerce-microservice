import UUID from './object-values/uuid';

export default interface DomainEvent {
    name: string
    eventVersion: number
    occurredOn: Date
    aggregateId: UUID
}
