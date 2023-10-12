import Queue from '../../application/gateways/Queue';
import ProcessPayment from '../../application/usecase/ProcessPayment';
import OrderCreated from '../../domain/events/OrderCreated';
import { Replace } from '../../helpers/Replace';


export default class QueueController {
    constructor (
        readonly queue: Queue,
        processPayment: ProcessPayment
    ) {
        queue.on('OrderCreated', async function (event: Replace<OrderCreated, {
            aggregateId: string
        }>) {
            await processPayment.execute({
                creditCardToken: event.creditCardToken,
                orderId: event.aggregateId,
                price: event.price
            });
        });
    }
}
