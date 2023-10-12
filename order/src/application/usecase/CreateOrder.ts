import { Order } from '../../core/domain/entities/order';
import Product from '../../core/domain/entities/product';
import OrderRepository from '../../core/domain/repositories/order';
import ProductRepository from '../../core/domain/repositories/product';
import Queue from '../protocols/Queue';

export default class Purchase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository,
        private readonly queue: Queue
    ) {}

    async execute(
        input: Input
    ) {
        const products: Product[] = [];

        for (const productId of input.productsIds) {
            const product = await this.productRepository.getById(productId);
            products.push(product);
        }
        const order = Order.create({
            products,
        });

        for (const event of order.getEvents()) {
            this.queue.publish(event);
        }
    }
}

type Input = {
    productsIds: string[]
}
