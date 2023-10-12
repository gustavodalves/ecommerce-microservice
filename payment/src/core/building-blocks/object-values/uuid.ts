export default class UUID {
    private readonly value: string;

    private create() {
        return crypto.randomUUID();
    }

    getValue() {
        return this.value;
    }

    constructor(
        uuid?: string
    ) {
        this.value = uuid || this.create();
    }
}
