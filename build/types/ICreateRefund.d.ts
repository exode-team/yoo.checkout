import { IAmount, IReceipt, ISource } from '.';
export interface ICreateRefund {
    payment_id: string;
    amount: IAmount;
    description?: string;
    receipt?: IReceipt;
    sources?: ISource[];
}
