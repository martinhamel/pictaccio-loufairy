import { isEmpty } from './is_empty';

const DEFAULT_MERGE_RECURSE_LEVEL = 10;

/**
 * Recursively merge objects together walking down each properties and copying the value.
 * @param destination
 * @param source
 * @param recurseLevel
 */
function _merge_recurse(destination: any, source: any, recurseLevel: number) {
    --recurseLevel;

    for (const prop in source) {
        if (typeof source.hasOwnProperty !== 'function' || source.hasOwnProperty(prop)) {  // eslint-disable-line
            const sourceProp: any = source[prop];
            if (sourceProp instanceof Array) {
                _merge_recurse(destination[prop] = [], sourceProp, recurseLevel);
            } else if (sourceProp && sourceProp instanceof RegExp) {
                destination[prop] = sourceProp;
            } else if (sourceProp && sourceProp instanceof Date) {
                destination[prop] = new Date(sourceProp);
            } else if (sourceProp &&
                typeof sourceProp === 'object' && (sourceProp.constructor === undefined || sourceProp.constructor.name === 'Object')) {
                destination[prop] = recurseLevel > 0 ?
                    _merge_recurse(destination[prop] || {}, sourceProp, recurseLevel) :
                    {};
            } else {
                destination[prop] = sourceProp;
            }
        }
    }

    return destination;
}

/**
 * Deeply merge two or more objects together
 * mergeObjects(deep: boolean, ...objects: any[])
 * mergeObject(deep: boolean, levelDefined: number, ...objects: any[])
 * mergeObject(...objects: any[])
 * @param deep Whether to do a shallow merge or deep merge
 * @param levelDefined How many level deep should the merge go
 * @param objects The objects to merge
 * @param args
 */
export function mergeObjects(...args: any[]) {
    const deep = typeof args[0] === 'boolean' && args[0];
    const levelDefined = deep && typeof args[1] === 'number';
    const recurseLevel = +!deep || (levelDefined ? args[1] : DEFAULT_MERGE_RECURSE_LEVEL);
    const objects = Array.prototype.slice.call(args, +deep + +levelDefined); // jshint ignore:line
    const combine = isEmpty(objects[0]) ? objects[0] : {};

    for (let i = 0, length = objects.length; i < length; ++i) {
        _merge_recurse(combine, objects[i], recurseLevel);
    }

    return combine;
}
