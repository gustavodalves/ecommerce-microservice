import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import PaymentGateway, { Input, Output } from '../../../application/gateways/Payment';
import { TransactionStatus } from '../../../domain/entities/Transaction';

const protoObject = protoLoader.loadSync(path.resolve(__dirname, 'payment.proto'));
const payment = grpc.loadPackageDefinition(protoObject) as any;

export default class PaymentGatewayGrpc implements PaymentGateway {
    private readonly client: any;

    constructor(
        private readonly serverUrl: string
    ) {
        this.client = new payment.PaymentService(this.serverUrl, grpc.credentials.createInsecure());
    }

    async createTransaction(input: Input): Promise<Output> {
        return new Promise((resolve, reject) => {
            this.client.pay(input, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        tid: response.tid,
                        status: response.status === 'confirmed' ? TransactionStatus.CONFIRMED : TransactionStatus.RECUSED
                    });
                }
            });
        });
    }
}
