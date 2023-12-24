import { DomainEvent } from "../events/domain-event";
import { InvoiceGenerated } from "../events/invoice-generated";
import { AggregateRoot } from "./aggregate";
import { UUID } from "./uuid";

export class Invoice extends AggregateRoot {
    private constructor(
        uuid: UUID,
        readonly orderId: string
    ) { super(uuid) }

    static create(
        orderId: string,
        status: number
    ) {
        if(status !== 1) throw new Error("payment not approved")

        const invoice = new Invoice(
            UUID.create(),
            orderId,
        )

        invoice.registerEvent(
            new InvoiceGenerated(invoice.uuid, orderId),
        )

        return invoice
    }

    static recover(
        id: string,
        orderId: string,
    ) {
        return new Invoice(
            new UUID(id),
            orderId
        )
    }
}
