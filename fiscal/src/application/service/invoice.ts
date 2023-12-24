import { Invoice } from "../../domain/entities/invoice";
import DomainEventManager from "../../domain/event-manager";
import { InvoiceRepository } from "../../domain/repositories/invoice";

export class InvoiceService {
    constructor(
        private readonly invoiceRepository: InvoiceRepository,
        private readonly domainEventManager: DomainEventManager,
    ) {}

    async createInvoice(
        orderId: string,
        paymentStatus: number
    ) {
        const invoice = Invoice.create(
            orderId,
            paymentStatus
        )

        await this.invoiceRepository.save(invoice)
        this.domainEventManager.publish(invoice)
    }
}
