"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInteger = void 0;
function isInteger(value) {
    const x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}
exports.isInteger = isInteger;
//# sourceMappingURL=is_integer.js.map