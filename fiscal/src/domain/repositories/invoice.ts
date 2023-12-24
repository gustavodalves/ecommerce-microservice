import { Invoice } from "../entities/invoice";

export interface InvoiceRepository {
    save(invoice: Invoice): Promise<void>
}
