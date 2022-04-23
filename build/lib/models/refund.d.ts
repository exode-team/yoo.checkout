import { IAmount, IReceipt, IRefundStatus, ISource } from "../types";
export declare class Refund {
    id: string;
    payment_id: string;
    status: IRefundStatus;
    created_at: string;
    amount: IAmount;
    description: string;
    sources: ISource[];
    receipt?: IReceipt;
    constructor();
}
export declare const refundFactory: (payload: any) => Refund;
