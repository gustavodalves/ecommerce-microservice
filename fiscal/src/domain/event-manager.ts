import { AggregateRoot } from "./entities/aggregate";
import { Invoice } from "./entities/invoice";

export default interface DomainEventManager {
    publish(aggregate: AggregateRoot): Promise<void>
};
