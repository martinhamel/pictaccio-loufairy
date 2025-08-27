"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObjects = void 0;
const is_empty_1 = require("./is_empty");
const DEFAULT_MERGE_RECURSE_LEVEL = 10;
function _merge_recurse(destination, source, recurseLevel) {
    --recurseLevel;
    for (const prop in source) {
        if (typeof source.hasOwnProperty !== 'function' || source.hasOwnProperty(prop)) {
            const sourceProp = source[prop];
            if (sourceProp instanceof Array) {
                _merge_recurse(destination[prop] = [], sourceProp, recurseLevel);
            }
            else if (sourceProp && sourceProp instanceof RegExp) {
                destination[prop] = sourceProp;
            }
            else if (sourceProp && sourceProp instanceof Date) {
                destination[prop] = new Date(sourceProp);
            }
            else if (sourceProp &&
                typeof sourceProp === 'object' && (sourceProp.constructor === undefined || sourceProp.constructor.name === 'Object')) {
                destination[prop] = recurseLevel > 0 ?
                    _merge_recurse(destination[prop] || {}, sourceProp, recurseLevel) :
                    {};
            }
            else {
                destination[prop] = sourceProp;
            }
        }
    }
    return destination;
}
function mergeObjects(...args) {
    const deep = typeof args[0] === 'boolean' && args[0];
    const levelDefined = deep && typeof args[1] === 'number';
    const recurseLevel = +!deep || (levelDefined ? args[1] : DEFAULT_MERGE_RECURSE_LEVEL);
    const objects = Array.prototype.slice.call(args, +deep + +levelDefined);
    const combine = (0, is_empty_1.isEmpty)(objects[0]) ? objects[0] : {};
    for (let i = 0, length = objects.length; i < length; ++i) {
        _merge_recurse(combine, objects[i], recurseLevel);
    }
    return combine;
}
exports.mergeObjects = mergeObjects;
//# sourceMappingURL=merge_objects.js.map