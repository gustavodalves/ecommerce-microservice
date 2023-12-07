import ProcessPayment from '../../application/usecase/ProcessPayment';
import OrderCreated from '../../domain/events/OrderCreated';
import { Replace } from '../../helpers/Replace';
import Queue from './queue';


export default class QueueController {
    constructor (
        readonly queue: Queue,
        processPayment: ProcessPayment
    ) {
        queue.on('OrderPaid', async function (event: Replace<OrderCreated, {
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
