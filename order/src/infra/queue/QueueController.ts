import Queue from '../../application/gateways/Queue';
import OrderPaymentProcessed from '../../application/usecase/OrderPaymentProcessed';
import ProcessPayment from '../../domain/events/processed-payment';

import { Replace } from '../../helpers/Replace';

export default class QueueController {
    constructor (
        readonly queue: Queue,
        orderPaymentProcessed: OrderPaymentProcessed
    ) {
        queue.on('PaymentProccessed', async function (event: Replace<ProcessPayment, {
            aggregateId: string,
            orderId: string
        }>) {
            await orderPaymentProcessed.execute({
                orderId: event.orderId,
                status: event.status
            });
        });
    }
}
