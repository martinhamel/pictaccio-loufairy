"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkError = void 0;
class NetworkError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NetworkError = NetworkError;
//# sourceMappingURL=network_error.js.map