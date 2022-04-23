"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentFactory = exports.Payment = void 0;
class Payment {
    constructor() {
    }
}
exports.Payment = Payment;
const paymentFactory = (payload) => {
    return Object.assign(new Payment(), payload);
};
exports.paymentFactory = paymentFactory;
