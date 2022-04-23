"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookFactory = exports.WebHook = void 0;
class WebHook {
}
exports.WebHook = WebHook;
const webhookFactory = (payload) => {
    return Object.assign(new WebHook(), payload);
};
exports.webhookFactory = webhookFactory;
