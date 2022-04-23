export declare class Me {
    account_id: string;
    test: boolean;
    fiscalization_enabled: boolean;
    payment_methods: string[];
    status: string;
    constructor();
}
export declare const meFactory: (payload: any) => Me;
