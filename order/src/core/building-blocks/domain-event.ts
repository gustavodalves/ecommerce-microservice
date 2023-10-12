export default interface DomainEvent {
    eventName: string
    eventVersion: number
    occurredOn: Date
    aggregateId: string
}
