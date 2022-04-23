export declare const apiUrl = "https://api.yookassa.ru/v3";
export declare const DEFAULT: {
    PACKAGE_VERSION: string;
    DEFAULT_DEBUG: boolean;
};
export declare enum PaymentStatuses {
    'waiting_for_capture' = "waiting_for_capture",
    'pending' = "pending",
    'succeeded' = "succeeded",
    'canceled' = "canceled"
}
export declare enum ReceiptStatuses {
    'pending' = "pending",
    'succeeded' = "succeeded",
    'canceled' = "canceled"
}
export declare enum WebHookEvents {
    'payment.waiting_for_capture' = "payment.waiting_for_capture",
    'payment.succeeded' = "payment.succeeded",
    'payment.canceled' = "payment.canceled",
    'refund.succeeded' = "refund.succeeded"
}
export declare enum RefundStatuses {
    'canceled' = "canceled",
    'succeeded' = "succeeded"
}
