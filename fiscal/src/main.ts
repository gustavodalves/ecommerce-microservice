import { InvoiceService } from "./application/service/invoice"
import { MongoDatabaseConnectSingleton } from "./infra/database/mongo/connection"
import { InvoiceMongoRepository } from "./infra/database/mongo/repositories/invoice"
import { DomainEventManagerAdapter } from "./infra/event-manager/event-manager"
import QueueController from "./infra/queues/controller"
import RabbitMQQueueAdapter from "./infra/queues/rabbitmq"

async function main() {
    const url = "mongodb://admin_user:admin_password@localhost:27017/invoice"
    const rabbitmq = new RabbitMQQueueAdapter()
    const connection = MongoDatabaseConnectSingleton.getInstance(
        url
    )

    await connection.connect()

    const invoiceRepository = new InvoiceMongoRepository()

    const domainEventManagerQueue = new DomainEventManagerAdapter(rabbitmq)

    const invoiceService = new InvoiceService(
        invoiceRepository,
        domainEventManagerQueue
    )

    new QueueController(rabbitmq, invoiceService);
}

main()
