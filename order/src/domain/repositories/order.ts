import { Order } from '../entities/order';

export default interface OrderRepository {
    save(order: Order): Promise<void>
    update(order: Order): Promise<void>
    getById(orderId: string): Promise<Order>
};
