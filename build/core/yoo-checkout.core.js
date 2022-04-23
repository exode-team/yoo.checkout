"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YooCheckout = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const models_1 = require("../models");
const _1 = require(".");
class YooCheckout {
    constructor(options) {
        this.options = options;
        this.shopId = this.options.shopId;
        this.secretKey = this.options.secretKey;
        this.debug = options.debug || _1.DEFAULT.DEFAULT_DEBUG;
        this.root = _1.apiUrl;
    }
    authData() {
        return {
            username: this.shopId,
            password: this.secretKey,
        };
    }
    buildQuery(filters) {
        const entries = Object.entries(filters);
        const queryString = entries.reduce((sum, [param, value], index) => (value['value'] && value['mode']
            ? `${sum}${param}.${value['mode']}=${value['value']}${index < entries.length - 1 ? '&' : ''}`
            : `${sum}${param}=${value}${index < entries.length - 1 ? '&' : ''}`), '?');
        return queryString === '?' ? '' : queryString;
    }
    normalizeFilter(filters) {
        if (!Boolean(filters)) {
            return {};
        }
        return Object.assign({}, filters);
    }
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
    createPayment(payload, idempotenceKey = (0, uuid_1.v4)()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData(), headers: { 'Idempotence-Key': idempotenceKey } };
                const { data } = yield axios_1.default.post(`${this.root}/payments`, payload, options);
                return (0, models_1.paymentFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
    /**
     * Get payment by id
     * @see 'https://yookassa.ru/developers/api#get_payment'
     * @param {string} paymentId
     * @paramExample '215d8da0-000f-50be-b000-0003308c89be'
     * @returns {Promise<Payment>}
     */
    getPayment(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData() };
                const { data } = yield axios_1.default.get(`${this.root}/payments/${paymentId}`, options);
                return (0, models_1.paymentFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
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
    capturePayment(paymentId, payload, idempotenceKey = (0, uuid_1.v4)()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData(), headers: { 'Idempotence-Key': idempotenceKey } };
                const { data } = yield axios_1.default.post(`${this.root}/payments/${paymentId}/capture`, payload, options);
                return (0, models_1.paymentFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
    /**
     * Cancel payment
     * @see 'https://yookassa.ru/developers/api#cancel_payment'
     * @param {string} paymentId
     * @paramExample '215d8da0-000f-50be-b000-0003308c89be'
     * @param {string} idempotenceKey
     * @paramExample '6daac9fa-342d-4264-91c5-b5eafd1a0010'
     * @returns {Promise<Payment>}
     */
    cancelPayment(paymentId, idempotenceKey = (0, uuid_1.v4)()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData(), headers: { 'Idempotence-Key': idempotenceKey } };
                const { data } = yield axios_1.default.post(`${this.root}/payments/${paymentId}/cancel`, {}, options);
                return (0, models_1.paymentFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
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
    getPaymentList(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.normalizeFilter(filters);
            try {
                const options = { auth: this.authData() };
                const { data } = yield axios_1.default.get(`${this.root}/payments${this.buildQuery(f)}`, options);
                data.items = data.items.map((i) => (0, models_1.paymentFactory)(i));
                return data;
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
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
    createRefund(payload, idempotenceKey = (0, uuid_1.v4)()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData(), headers: { 'Idempotence-Key': idempotenceKey } };
                const { data } = yield axios_1.default.post(`${this.root}/refunds`, payload, options);
                return (0, models_1.refundFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
    /**
     * Get refund by id
     * @see 'https://yookassa.ru/developers/api#get_refund'
     * @param {string} refundId
     * @paramExample '216749f7-0016-50be-b000-078d43a63ae4'
     * @returns {Promise<Refund>}
     */
    getRefund(refundId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData() };
                const { data } = yield axios_1.default.get(`${this.root}/refunds/${refundId}`, options);
                return (0, models_1.refundFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
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
    getRefundList(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.normalizeFilter(filters);
            try {
                const options = { auth: this.authData() };
                const { data } = yield axios_1.default.get(`${this.root}/refunds${this.buildQuery(f)}`, options);
                data.items = data.items.map((i) => (0, models_1.refundFactory)(i));
                return data;
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
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
    createReceipt(payload, idempotenceKey = (0, uuid_1.v4)()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData(), headers: { 'Idempotence-Key': idempotenceKey } };
                const { data } = yield axios_1.default.post(`${this.root}/receipts`, payload, options);
                return (0, models_1.receiptFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
    /**
     * Get receipt by id
     * @see 'https://yookassa.ru/developers/api#get_receipt'
     * @param {string} receiptId
     * @paramExample '216749f7-0016-50be-b000-078d43a63ae4'
     * @returns {Promise<Receipt>}
     */
    getReceipt(receiptId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { auth: this.authData() };
                const { data } = yield axios_1.default.get(`${this.root}/receipts/${receiptId}`, options);
                return (0, models_1.receiptFactory)(data);
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
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
    getReceiptList(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.normalizeFilter(filters);
            try {
                const options = { auth: this.authData() };
                const { data } = yield axios_1.default.get(`${this.root}/receipts${this.buildQuery(f)}`, options);
                data.items = data.items.map((i) => (0, models_1.receiptFactory)(i));
                return data;
            }
            catch (error) {
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
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
    createWebHook(payload, idempotenceKey = (0, uuid_1.v4)()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.options.token) {
                    throw (0, models_1.errorFactory)({
                        id: (0, uuid_1.v4)(),
                        code: 'Internal error',
                        errorCode: 500,
                        description: 'Web hook functionality is only available with an OAuth token',
                        parameter: 'Authorization',
                        type: 'Internal',
                    });
                }
                const options = {
                    headers: {
                        'Idempotence-Key': idempotenceKey,
                        'Authorization': `Bearer ${this.options.token}`,
                    },
                };
                const { data } = yield axios_1.default.post(`${this.root}/webhooks`, payload, options);
                return (0, models_1.webhookFactory)(data);
            }
            catch (error) {
                if (error instanceof models_1.ErrorResponse) {
                    throw error;
                }
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
    /**
     * Get webhook list
     * @see 'https://yookassa.ru/developers/api#get_webhook_list'
     * @returns {Promise<Object>}
     */
    getWebHookList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.options.token) {
                    throw (0, models_1.errorFactory)({
                        id: (0, uuid_1.v4)(),
                        code: 'Internal error',
                        errorCode: 500,
                        description: 'Web hook functionality is only available with an OAuth token',
                        parameter: 'Authorization',
                        type: 'Internal',
                    });
                }
                const options = { headers: { 'Authorization': `Bearer ${this.options.token}` } };
                const { data } = yield axios_1.default.get(`${this.root}/webhooks`, options);
                data.items = data.items.map((i) => (0, models_1.webhookFactory)(i));
                return data;
            }
            catch (error) {
                if (error instanceof models_1.ErrorResponse) {
                    throw error;
                }
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
    /**
     * Delete webhook
     * @see 'https://yookassa.ru/developers/api#delete_webhook
     * @param {string} id
     * @paramExample
     * wh-edba6d49-ce3e-4d99-991b-4bb164859dc3
     * @returns {Promise<Object>}
     */
    deleteWebHook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.options.token) {
                    throw (0, models_1.errorFactory)({
                        id: (0, uuid_1.v4)(),
                        code: 'Internal error',
                        errorCode: 500,
                        description: 'Web hook functionality is only available with an OAuth token',
                        parameter: 'Authorization',
                        type: 'Internal',
                    });
                }
                const options = { headers: { 'Authorization': `Bearer ${this.options.token}` } };
                yield axios_1.default.delete(`${this.root}/webhooks/${id}`, options);
                return {};
            }
            catch (error) {
                if (error instanceof models_1.ErrorResponse) {
                    throw error;
                }
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
    /**
     * Get shop info
     * @see 'https://yookassa.ru/developers/api#get_me'
     * @returns {Promise<Object>}
     */
    getShop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.options.token) {
                    throw (0, models_1.errorFactory)({
                        id: (0, uuid_1.v4)(),
                        code: 'Internal error',
                        errorCode: 500,
                        description: 'Shop information is only available with an OAuth token',
                        parameter: 'Authorization',
                        type: 'Internal',
                    });
                }
                const options = { headers: { 'Authorization': `Bearer ${this.options.token}` } };
                const { data } = yield axios_1.default.get(`${this.root}/me`, options);
                return (0, models_1.meFactory)(data);
            }
            catch (error) {
                if (error instanceof models_1.ErrorResponse) {
                    throw error;
                }
                throw (0, models_1.errorFactory)(error);
            }
        });
    }
}
exports.YooCheckout = YooCheckout;
