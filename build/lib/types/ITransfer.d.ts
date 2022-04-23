import { IAmount, IPaymentStatus } from ".";
export interface ITransfer {
    account_id: string;
    amount: IAmount;
    status?: IPaymentStatus;
    platform_fee_amount: IAmount;
}
export declare type ITransferWithoutStatus = Omit<ITransfer, 'status'>;
