import OrderPaymentProcessed from "../../../../order/src/application/usecase/OrderPaymentProcessed";
import ProcessPayment from "../../../../order/src/domain/events/processed-payment";
import { Replace } from "../../../../order/src/helpers/Replace";
import { InvoiceService } from "../../application/service/invoice";
import { DomainEvent } from "../../domain/events/domain-event";
import Queue from "./queue";

class PaymentProcessed {
    readonly eventVersion: number = 1;
    readonly eventName = 'ProcessPayment';
    readonly occurredOn = new Date();

    constructor(
        readonly aggregateId: string,
        readonly status: number
    ) {}
}

export default class QueueController {
    constructor (
        readonly queue: Queue,
        invoiceService: InvoiceService
    ) {
        queue.on('PaymentProccessed', async function (event: Replace<PaymentProcessed, {
            aggregateId: string,
            orderId: string
        }>) {
            await invoiceService.createInvoice(
                event.aggregateId,
                event.status
            )
        });
    }
}
