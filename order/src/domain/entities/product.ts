import AggregateRoot from '../../core/building-blocks/aggregate-root';
import UUID from '../../core/building-blocks/object-values/uuid';
import ChangePriceProduct from '../events/price-changed';
import CreateProduct from '../events/product-created';

type CreateProductCommand = {
    name: string
    description: string
    price: number
}

class ProductId extends UUID {}

export default class Product extends AggregateRoot {
    constructor (
        public name: string,
        public description: string,
        private price: number,
        id?: ProductId | string
    ) {
        super(id);
    }

    static create(props: CreateProductCommand) {
        const product = new Product(
            props.name,
            props.description,
            props.price,
        );

        product.addEvent(
            new CreateProduct(
                product.id.getValue(),
                product.name,
                product.description,
                product.price
            )
        );

        return product;
    }

    getPrice() {
        return this.price;
    }

    changePrice(
        price: number
    ) {
        this.price = price;
        this.addEvent(
            new ChangePriceProduct(
                this.id.getValue(),
                this.price
            )
        );
    }
}
