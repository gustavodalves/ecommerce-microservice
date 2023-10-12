import AggregateRoot from '../../core/building-blocks/aggregate-root';
import UUID from '../../core/building-blocks/object-values/uuid';
import OrderCreated from '../events/order-created';
import { OrderPaid } from '../events/order-paid';
import { OrderCancelled } from '../events/order-cancelled';
import Cart from './cart';
import { OrderPayConfirmed } from '../events/order-pay-confirmed';
import Product from './product';

export enum OrderStatus {
  PENDING = 1,
  PAID = 2,
  CANCELLED = 3,
  PROCESSING = 4,
}

export class OrderId extends UUID {}

export type OrderConstructorProps = {
  id?: OrderId | string;
  products: Product[];
};

export class Order extends AggregateRoot {
    id: OrderId;
    amount: number;
    status: OrderStatus = OrderStatus.PENDING;
    cart: Cart;

    constructor(props: OrderConstructorProps) {
        super();
        this.id =
      typeof props.id === 'string'
          ? new OrderId(props.id)
          : props.id ?? new OrderId();

        this.cart = new Cart(props.products);
        this.amount = this.getTotal();
    }

    static create(props: OrderConstructorProps) {
        const order = new Order(props);
        order.addEvent(
            new OrderCreated(
                order.id.getValue(),
                order.amount,
                order.status,
                order.getTotal()
            ),
        );
        return order;
    }

    getTotal() {
        return this.cart.getTotal();
    }

    pay(cardToken: string) {
        this.status = OrderStatus.PROCESSING;
        this.addEvent(new OrderPaid(this.id.getValue(), this.status, cardToken, this.amount));
    }

    confirmPay() {
        this.status = OrderStatus.PAID;
        this.addEvent(new OrderPayConfirmed(this.id.getValue(), this.status));
    }

    cancel() {
        this.status = OrderStatus.CANCELLED;
        this.addEvent(new OrderCancelled(this.id.getValue(), this.status));
    }
}
