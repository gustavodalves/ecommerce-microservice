import AggregateRoot from '../../core/building-blocks/aggregate-root';
import DomainEventManager from './EventManager';

export default class DomainService {
    constructor(
        private readonly eventManager: DomainEventManager,
        private readonly aggregate: AggregateRoot
    ) {}

    async finish() {
        this.eventManager.publish(this.aggregate);
    }
}
