import UUID from '../../core/building-blocks/object-values/uuid';
import Product from './product';

export default class Cart {
    products: Product[];

    constructor(
        products: Product[],
    ) {
        this.products = products;
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    getTotal() {
        return this.products.reduce((acc, item) =>
            item.getPrice() + acc
        , 0);
    }
}
