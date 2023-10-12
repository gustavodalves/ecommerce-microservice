import DomainEvent from './domain-event';

export interface DomainEventHandler {
  handle(event: DomainEvent): Promise<void>;
}
