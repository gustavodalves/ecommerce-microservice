import DomainEventManager from '../../domain/application/EventManager';
import OrderRepository from '../../domain/repositories/order';

export default class OrderPaymentProcessed {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly eventManager: DomainEventManager
    ) {}

    async execute(input: Input) {
        const order = await this.orderRepository.getById(input.orderId);
        input.status === 1 ? order.confirmPay() : order.cancel();
        this.orderRepository.update(order);
        this.eventManager.publish(order);
    }
}

type Input = { orderId: string, status: number }
