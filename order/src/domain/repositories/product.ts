import Product from '../entities/product';

export default interface ProductRepository {
    save(product: Product): Promise<void>
    update(product: Product): Promise<void>
    getById(productId: string): Promise<Product>
};
