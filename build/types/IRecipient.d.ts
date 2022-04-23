export interface IRecipient {
    account_id?: string;
    gateway_id: string;
}
export declare type IRecipientWithoutId = Omit<IRecipient, 'account_id'>;
