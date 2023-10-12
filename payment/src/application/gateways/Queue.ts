import DomainEvent from '../../core/building-blocks/domain-event';

export default interface Queue {
	connect (): Promise<void>;
	on (event: string, callback: Function): Promise<void>;
	publish (event: DomainEvent): Promise<void>;
};
