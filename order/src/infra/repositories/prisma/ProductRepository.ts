import { PrismaClient } from '@prisma/client';
import ProductRepository from '../../../domain/repositories/product';
import Product from '../../../domain/entities/product';

export default class PrismaProductRepository implements ProductRepository {
    constructor(
        private readonly prismaClient: PrismaClient
    ) {}

    async getById(productId: string): Promise<Product | undefined> {
        const raw = await this.prismaClient.product.findUnique({
            where: {
                id: productId
            }
        });

        if(!raw) { return; }

        return new Product(
            raw.name,
            raw.description,
            raw.price,
            raw.id
        );
    }

    async save(product: Product): Promise<void> {
        await this.prismaClient.product.create({
            data: {
                description: product.description,
                name: product.name,
                price: product.getPrice(),
                id: product.id.getValue()
            }
        });
    }

    async update(product: Product): Promise<void> {
        await this.prismaClient.product.update({
            where: { id: product.id.getValue() },
            data: {
                description: product.description,
                name: product.name,
                price: product.getPrice(),
            }
        });
    }
}
