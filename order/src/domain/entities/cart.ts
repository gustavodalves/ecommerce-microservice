import Entity from '../../core/building-blocks/entity';
import UUID from '../../core/building-blocks/object-values/uuid';
import Product from './product';

export default class Cart extends Entity {
    products: Product[];

    constructor(
        products: Product[],
        id?: UUID | string,
    ) {
        super(id);
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
