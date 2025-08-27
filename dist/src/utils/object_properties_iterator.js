"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectPropertiesIterator = void 0;
const is_object_1 = require("./is_object");
function* objectPropertiesIterator(object, filter = /.*/) {
    if (!(0, is_object_1.isObject)(object)) {
        return;
    }
    for (const prop of Object.keys(object)) {
        if (filter.test(prop)) {
            yield prop;
        }
    }
}
exports.objectPropertiesIterator = objectPropertiesIterator;
//# sourceMappingURL=object_properties_iterator.js.map