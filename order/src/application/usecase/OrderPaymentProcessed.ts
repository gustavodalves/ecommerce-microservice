import DomainEventManager from '../../domain/application/EventManager';
import OrderRepository from '../../domain/repositories/order';

export default class OrderPaymentProcessed {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly eventManager: DomainEventManager
    ) {}

    async execute(input: Input) {
        const order = await this.orderRepository.getById(input.orderId);
        order.status === 1 ? order.confirmPay() : order.cancel();
        this.eventManager.publish(order);
        this.orderRepository.update(order);
    }
}

type Input = { orderId: string, status: number }
