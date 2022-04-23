"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meFactory = exports.Me = void 0;
class Me {
    constructor() { }
}
exports.Me = Me;
const meFactory = (payload) => {
    return Object.assign(new Me(), payload);
};
exports.meFactory = meFactory;
