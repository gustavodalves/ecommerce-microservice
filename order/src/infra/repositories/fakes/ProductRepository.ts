import Product from '../../../domain/entities/product';
import ProductRepository from '../../../domain/repositories/product';

export default class FakeProductRepository implements ProductRepository {
    private readonly data: Product[] = [
        new Product(
            'lorem ipsum',
            'iPhone 15',
            3213,
            '123'
        ),
        new Product(
            'lorem ipsum',
            'iPhone 14',
            3213,
            '1234'
        )
    ];

    async getById(productId: string): Promise<Product> {
        const product = this.data.find(item => item.id.getValue() === productId);
        if(!product) throw new Error('Product not founded');
        return product;
    }

    async save(product: Product): Promise<void> {
        this.data.push(product);
    }

    async update(product: Product): Promise<void> {
        const raw = await this.getById(product.id.getValue());
        raw.name = product.name;
    }
}
