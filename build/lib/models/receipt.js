"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptFactory = exports.Receipt = void 0;
class Receipt {
    constructor() { }
}
exports.Receipt = Receipt;
const receiptFactory = (payload) => {
    return Object.assign(new Receipt(), payload);
};
exports.receiptFactory = receiptFactory;
