import { UUID } from "../entities/uuid";
import { DomainEvent } from "./domain-event";

export class InvoiceGenerated extends DomainEvent {
    eventName: string = "InvoiceGenerated"

    constructor(
        uuid: UUID,
        readonly orderId: string
    ) {
        super(uuid)
    }
}
