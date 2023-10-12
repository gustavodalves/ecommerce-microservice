import { Order } from '../../../domain/entities/order';
import Product from '../../../domain/entities/product';
import OrderRepository from '../../../domain/repositories/order';

import { PrismaClient } from '@prisma/client';

export default class PrismaOrderRepository implements OrderRepository {
    constructor(
        private readonly prismaClient: PrismaClient
    ) {}

    async getById(orderId: string): Promise<Order> {
        const raw = await this.prismaClient.order.findUnique({
            where: {
                id: orderId
            },
            select: {
                cart: {
                    select: { products: true }
                }
            }
        });

        if(!raw) { throw new Error('order not exists'); }

        return new Order({
            products: raw.cart.products!.map(item => new Product(
                item.name,
                item.description,
                item.price,
                item.id
            ))
        });
    }

    async save(order: Order): Promise<void> {
        await this.prismaClient.order.create({
            data: {
                status: order.status,
                id: order.id.getValue(),
                cart: {
                    create: {
                        CartProducts: {
                            create: order.cart.products.map(item => ({
                                product: { connect: { id: item.id.getValue() }}
                            }))
                        }
                    }
                }
            }
        });
    }

    async update(order: Order): Promise<void> {
        await this.prismaClient.order.update({
            where: { id: order.id.getValue() },
            data: {
                status: order.status
            }
        });
    }
}
