"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
function isEmpty(value) {
    if (value === '' || value === undefined || value === null) {
        return true;
    }
    if (value.length !== undefined) {
        return value.length === 0;
    }
    for (const prop in value) {
        return false;
    }
    return typeof value === 'object';
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=is_empty.js.map