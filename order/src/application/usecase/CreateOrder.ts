import OrderRepository from '../../domain/repositories/order';
import ProductRepository from '../../domain/repositories/product';
import { Order } from '../../domain/entities/order';
import Product from '../../domain/entities/product';
import DomainEventManager from '../../domain/application/EventManager';

export default class CreateOrder {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository,
        private readonly eventManager: DomainEventManager
    ) {}

    async execute(
        input: Input
    ) {
        const products: Product[] = [];

        for (const productId of input.productsIds) {
            const product = await this.productRepository.getById(productId);

            if(!product) throw new Error(`Product ${productId} not exists`);

            products.push(product);
        }

        const order = Order.create({
            products,
        });

        this.eventManager.publish(order);
        this.orderRepository.save(order);
    }
}

type Input = {
    productsIds: string[]
}
