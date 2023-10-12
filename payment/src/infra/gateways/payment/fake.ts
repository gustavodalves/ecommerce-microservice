import PaymentGateway, { Input, Output } from '../../../application/gateways/Payment';

export default class FakePaymentGateway implements PaymentGateway {
    async createTransaction(input: Input): Promise<Output> {
        return {
            tid: '213fcace23ddcacasc',
            status: 1
        };
    }
}
