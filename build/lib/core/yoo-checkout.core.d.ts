import { Payment, Receipt, Refund, WebHook, Me } from '../models';
import { ICapturePayment, ICreatePayment, ICreateReceipt, ICreateRefund, IGetRefundList, IGetPaymentList, IPaymentList, IYooCheckoutOptions, IRefundList, IReceiptList, IGetReceiptList, ICreateWebHook, IWebHookList } from '../types';
export declare class YooCheckout {
    private readonly options;
    readonly shopId: string;
    readonly secretKey: string;
    readonly root: string;
    readonly debug: boolean;
    constructor(options: IYooCheckoutOptions);
    private authData;
    private buildQuery;
    private normalizeFilter;
    /**
     * Create payment
     * @see 'https://yookassa.ru/developers/api#create_payment'
     * @param {Object} payload
     * @paramExample
     * {
     *   "amount": { "value": '2.00', "currency": 'RUB' },
     *   "payment_method_data": { "type": 'bank_card'  },
     *   "confirmation": { "type": 'redirect', "return_url": 'https://www.merchant-website.com/return_url' }
     * }
     * @param {string} idempotenceKey
     * @paramExample '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     * @returns {Promise<Payment>}
     */
    createPayment(payload: ICreatePayment, idempotenceKey?: string): Promise<Payment>;
    /**
     * Get payment by id
     * @see 'https://yookassa.ru/developers/api#get_payment'
     * @param {string} paymentId
     * @paramExample '215d8da0-000f-50be-b000-0003308c89be'
     * @returns {Promise<Payment>}
     */
    getPayment(paymentId: string): Promise<Payment>;
    /**
     * Capture payment
     * @see 'https://yookassa.ru/developers/api#capture_payment'
     * @param {string} paymentId
     * @paramExample '215d8da0-000f-50be-b000-0003308c89be'
     * @param {Object} payload
     * @paramExample
     * {
     *   "amount": { "value": '2.00', "currency": 'RUB' }
     * }
     * @param {string} idempotenceKey
     * @paramExample '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     * @returns {Promise<Payment>}
     */
    capturePayment(paymentId: string, payload: ICapturePayment, idempotenceKey?: string): Promise<Payment>;
    /**
     * Cancel paymnet
     * @see 'https://yookassa.ru/developers/api#cancel_payment'
     * @param {string} paymentId
     * @paramExample '215d8da0-000f-50be-b000-0003308c89be'
     * @param {string} idempotenceKey
     * @paramExample '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     * @returns {Promise<Payment>}
     */
    cancelPayment(paymentId: string, idempotenceKey?: string): Promise<Payment>;
    /**
     * Get payment list
     * @see 'https://yookassa.ru/developers/api#get_payments_list'
     * @param {Object} filters
     * @paramExample
     * {
     *  "created_at": { "value": '2021-01-27T13:58:02.977Z', "mode": 'gte' },
     *  "limit": 20
     * }
     * @returns {Promise<Object>}
     */
    getPaymentList(filters?: IGetPaymentList): Promise<IPaymentList>;
    /**
     * Create refund
     * @see 'https://yookassa.ru/developers/api#create_refund'
     * @param {Object} payload
     * @paramExample
     * {
     *     "payment_id": '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     *     "amount": { "value": '2.00', "currency": 'RUB' }
     * }
     * @param {string} idempotenceKey
     * @paramExample '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     * @returns {Promise<Refund>}
     */
    createRefund(payload: ICreateRefund, idempotenceKey?: string): Promise<Refund>;
    /**
     * Get refund by id
     * @see 'https://yookassa.ru/developers/api#get_refund'
     * @param {string} refundId
     * @paramExample '216749f7-0016-50be-b000-078d43a63ae4'
     * @returns {Promise<Refund>}
     */
    getRefund(refundId: string): Promise<Refund>;
    /**
     * Get refund list
     * @see 'https://yookassa.ru/developers/api#get_refunds_list'
     * @param {Object} filters
     * @paramExample
     * {
     *  "created_at": { "value": '2021-01-27T13:58:02.977Z', "mode": 'gte' },
     *  "limit": 20
     * }
     * @returns {Promise<Object>}
     */
    getRefundList(filters?: IGetRefundList): Promise<IRefundList>;
    /**
     * Create receipt
     * @see 'https://yookassa.ru/developers/api#create_receipt'
     * @param {Object} payload
     * @paramExample
     * {
     *     "send": true,
     *     "customer": { "email": 'test@gmail.com' },
     *     "settlements": [{"type": 'cashless', "amount": { "value": '2.00', "currency": 'RUB' }}],
     *     "refund_id": '27a387af-0015-5000-8000-137da144ce29',
     *     "type": 'refund',
     *     "items": [{ "description": 'test', "quantity": '2', "amount": { "value": '1.00', "currency": 'RUB' }, "vat_code": 1 }]
     * }
     * @param {string} idempotenceKey
     * @paramExample '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     * @returns {Promise<Receipt>}
     */
    createReceipt(payload: ICreateReceipt, idempotenceKey?: string): Promise<Receipt>;
    /**
     * Get receipt by id
     * @see 'https://yookassa.ru/developers/api#get_receipt'
     * @param {string} receiptId
     * @paramExample '216749f7-0016-50be-b000-078d43a63ae4'
     * @returns {Promise<Receipt>}
     */
    getReceipt(receiptId: string): Promise<Receipt>;
    /**
     * Get receipt list
     * @see 'https://yookassa.ru/developers/api#get_receipts_list'
     * @param {Object} filters
     * @paramExample
     * {
     *  "created_at": { "value": '2021-01-27T13:58:02.977Z', "mode": 'gte' },
     *  "limit": 20
     * }
     * @returns {Promise<Object>}
     */
    getReceiptList(filters?: IGetReceiptList): Promise<IReceiptList>;
    /**
     * Create webhook
     * @see 'https://yookassa.ru/developers/api#create_webhook
     * @param {Object} payload
     * @paramExample
     * {
     *  "event": "payment.canceled",
     *  "url": "https://test.com/hook"
     * }
     * @param {string} idempotenceKey
     * @paramExample '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     * @returns {Promise<Object>}
     */
    createWebHook(payload: ICreateWebHook, idempotenceKey?: string): Promise<WebHook>;
    /**
     * Get webhook list
     * @see 'https://yookassa.ru/developers/api#get_webhook_list'
     * @returns {Promise<Object>}
     */
    getWebHookList(): Promise<IWebHookList>;
    /**
     * Delete webhook
     * @see 'https://yookassa.ru/developers/api#delete_webhook
     * @param {string} id
     * @paramExample
     * wh-edba6d49-ce3e-4d99-991b-4bb164859dc3
     * @returns {Promise<Object>}
     */
    deleteWebHook(id: string): Promise<{}>;
    /**
     * Get shop info
     * @see 'https://yookassa.ru/developers/api#get_me'
     * @returns {Promise<Object>}
     */
    getShop(): Promise<Me>;
}
