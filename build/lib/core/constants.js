"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundStatuses = exports.WebHookEvents = exports.ReceiptStatuses = exports.PaymentStatuses = exports.DEFAULT = exports.apiUrl = void 0;
exports.apiUrl = 'https://api.yookassa.ru/v3';
exports.DEFAULT = {
    PACKAGE_VERSION: '1',
    DEFAULT_DEBUG: false,
    // tslint:disable-next-line: no-require-imports
};
var PaymentStatuses;
(function (PaymentStatuses) {
    PaymentStatuses["waiting_for_capture"] = "waiting_for_capture";
    PaymentStatuses["pending"] = "pending";
    PaymentStatuses["succeeded"] = "succeeded";
    PaymentStatuses["canceled"] = "canceled";
})(PaymentStatuses = exports.PaymentStatuses || (exports.PaymentStatuses = {}));
var ReceiptStatuses;
(function (ReceiptStatuses) {
    ReceiptStatuses["pending"] = "pending";
    ReceiptStatuses["succeeded"] = "succeeded";
    ReceiptStatuses["canceled"] = "canceled";
})(ReceiptStatuses = exports.ReceiptStatuses || (exports.ReceiptStatuses = {}));
var WebHookEvents;
(function (WebHookEvents) {
    WebHookEvents["payment.waiting_for_capture"] = "payment.waiting_for_capture";
    WebHookEvents["payment.succeeded"] = "payment.succeeded";
    WebHookEvents["payment.canceled"] = "payment.canceled";
    WebHookEvents["refund.succeeded"] = "refund.succeeded";
})(WebHookEvents = exports.WebHookEvents || (exports.WebHookEvents = {}));
var RefundStatuses;
(function (RefundStatuses) {
    RefundStatuses["canceled"] = "canceled";
    RefundStatuses["succeeded"] = "succeeded";
})(RefundStatuses = exports.RefundStatuses || (exports.RefundStatuses = {}));
