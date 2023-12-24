import crypto from "crypto"

export class UUID {
    constructor(
        readonly value: string
    ) {}

    static create() {
        return new UUID(
            crypto.randomUUID()
        )
    }
}
