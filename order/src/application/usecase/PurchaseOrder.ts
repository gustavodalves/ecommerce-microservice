import OrderRepository from '../../core/domain/repositories/order';
import Queue from '../protocols/Queue';

export default class PurchaseOrder {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly queue: Queue
    ) {}

    async execute(input: Input) {
        const order = await this.orderRepository.getById(input.orderId);

        order.pay();
        this.orderRepository.update(order);

        for (const event of order.getEvents()) {
            this.queue.publish(event);
        }
    }
}

type Input = {
    orderId: string
}
