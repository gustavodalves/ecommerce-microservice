import { TransactionStatus } from '../../domain/entities/Transaction';

export default interface PaymentGateway {
	createTransaction (input: Input): Promise<Output>;
}

export type Input = {
	price: number,
	creditCardToken: string,
}

export type Output = {
	tid: string,
	status: TransactionStatus,
}
