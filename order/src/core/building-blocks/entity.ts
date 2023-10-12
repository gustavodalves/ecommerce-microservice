import UUID from './object-values/uuid';

export default abstract class Entity {
    readonly id: UUID;
    constructor(
        id?: string | UUID
    ) {
        this.id = typeof id === 'string' ? new UUID(id) : id ? id : new UUID();
    }
}
