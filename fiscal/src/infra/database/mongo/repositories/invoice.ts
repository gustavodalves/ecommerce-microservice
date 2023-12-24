import { Invoice } from "../../../../domain/entities/invoice";
import { InvoiceRepository } from "../../../../domain/repositories/invoice";

import InvoiceModel from '../models/invoice'

export class InvoiceMongoRepository implements InvoiceRepository {
    async save(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            _id: invoice.uuid.value,
            orderId: invoice.orderId,
        })
    }
}
