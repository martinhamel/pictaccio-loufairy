export function isEmpty(value: any) {
    if (value === '' || value === undefined || value === null) {
        return true;
    }
    if (value.length !== undefined) {
        return value.length === 0;
    }

    for (const prop in value) { // tslint:disable-line
        return false;
    }

    return typeof value === 'object';
}
