import Product from '../../domain/entities/product';
import ProductRepository from '../../domain/repositories/product';

export default class CreateProduct {
    constructor(
        private readonly productRepository: ProductRepository,
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
    }
}


type Input = {
    description: string
    price: number
    name: string
}
