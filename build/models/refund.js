"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundFactory = exports.Refund = void 0;
class Refund {
    constructor() { }
}
exports.Refund = Refund;
const refundFactory = (payload) => {
    return Object.assign(new Refund(), payload);
};
exports.refundFactory = refundFactory;
