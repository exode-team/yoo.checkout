"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFactory = exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor() {
    }
}
exports.ErrorResponse = ErrorResponse;
const errorFactory = (payload) => {
    return Object.assign(new ErrorResponse(), payload);
};
exports.errorFactory = errorFactory;
