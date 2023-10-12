import { Order } from '../../../domain/entities/order';
import Product from '../../../domain/entities/product';
import OrderRepository from '../../../domain/repositories/order';

export default class FakeOrderRepository implements OrderRepository {
    private readonly data: Order[] = [
        new Order({
            products: [new Product(
                'lorem ipsum',
                'iPhone 15',
                3213,
                '123'
            ),],
            id: '5713150b-fb25-4c26-9afe-2bf41f909d08',
        })
    ];

    async getById(orderId: string): Promise<Order> {
        const order= this.data.find(item => item.id.getValue() === orderId);
        if(!order) throw new Error('Order not founded');
        return order;
    }

    async save(order: Order): Promise<void> {
        this.data.push(order);
    }

    async update(order: Order): Promise<void> {
        const raw = await this.getById(order.id.getValue());
        raw.status = order.status;
    }
}
