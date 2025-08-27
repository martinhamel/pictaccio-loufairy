import { isObject } from './is_object';

/**
 * Iterate over properties of an object
 * @param object The object to iterate over
 * @param filter Return properties matching this filter, defaults to RegExp .*
 */
export function* objectPropertiesIterator(object: Record<string, unknown>, filter = /.*/): Generator<string> {
    if (!isObject(object)) {
        return;
    }

    for (const prop of Object.keys(object)) {
        if (filter.test(prop)) {
            yield prop;
        }
    }
}
