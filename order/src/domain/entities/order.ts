import AggregateRoot from '../../core/building-blocks/aggregate-root';
import UUID from '../../core/building-blocks/object-values/uuid';
import OrderCreated from '../events/order-created';
import { OrderPaid } from '../events/order-paid';
import { OrderCancelled } from '../events/order-cancelled';
import Cart from './cart';
import { OrderPayConfirmed } from '../events/order-pay-confirmed';
import Product from './product';

export enum OrderStatus {
  PENDING,
  PAID,
  CANCELLED,
  PROCESSING,
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
    }

    static create(props: OrderConstructorProps) {
        const order = new Order(props);
        order.addEvent(
            new OrderCreated(
                order.id,
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

    pay() {
        this.status = OrderStatus.PROCESSING;
        this.addEvent(new OrderPaid(this.id, this.status));
    }

    confirmPay() {
        this.status = OrderStatus.PAID;
        this.addEvent(new OrderPayConfirmed(this.id, this.status));
    }

    cancel() {
        this.status = OrderStatus.CANCELLED;
        this.addEvent(new OrderCancelled(this.id, this.status));
    }
}
