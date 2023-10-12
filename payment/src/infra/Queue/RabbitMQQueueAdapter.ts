import amqplib from 'amqplib';
import Queue from '../../application/gateways/Queue';
import DomainEvent from '../../core/building-blocks/domain-event';

export default class RabbitMQQueueAdapter implements Queue {
    connection: any;

    async connect(): Promise<void> {
        this.connection = await amqplib.connect('amqp://127.0.0.1');
    }

    async close(): Promise<void> {
        await this.connection.close();
    }

    async on(eventName: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(eventName, { durable: true });
        await channel.consume(eventName, async function (msg: any) {
            if (msg) {
                const input = JSON.parse(msg.content.toString());
                await callback(input);
                channel.ack(msg);
            }
        });
    }

    async publish(event: DomainEvent): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(event.name, { durable: true });
        channel.sendToQueue(event.name, Buffer.from(JSON.stringify(event)));
        await channel.close();
    }
}
