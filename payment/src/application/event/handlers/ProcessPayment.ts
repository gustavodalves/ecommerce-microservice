import { DomainEventHandler } from '../../core/building-blocks/domain-event-handler';
import Queue from '../gateways/Queue';

import PaymentApproved from '../../domain/events/PaymentProcessed';

export default class ApprovePayment implements DomainEventHandler {
    constructor(
        private queue: Queue,
    ) {}

    async handle(event: PaymentApproved): Promise<void> {
        await this.queue.publish(event);
    }
}
