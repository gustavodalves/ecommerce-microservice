import Product from '../../core/domain/entities/product';
import ProductRepository from '../../core/domain/repositories/product';
import Queue from '../protocols/Queue';

export default class CreateProduct {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly queue: Queue
    ) {}

    async execute(
        input: Input
    ) {
        const product = Product.create({
            description: input.description,
            name: input.name,
            price: input.price
        });

        await this.productRepository.save(product);

        for (const event of product.getEvents()) {
            this.queue.publish(event);
        }
    }
}


type Input = {
    description: string
    price: number
    name: string
}
