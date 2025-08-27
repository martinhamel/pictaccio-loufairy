export function deepCompare(obj1, obj2): boolean {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (const key of obj1Keys) {
        if ((typeof obj1[key] === 'object' && obj1[key] !== null) &&
            (typeof obj2[key] === 'object' && obj2[key] !== null)) {
            if (obj1[key] instanceof Date &&
                    obj2[key] instanceof Date &&
                    obj1[key].getTime() !== obj2[key].getTime()) {
                return false;
            } else if (obj1[key] instanceof Date || obj2[key] instanceof Date) {
                return false;
            } else if (!deepCompare(obj1[key], obj2[key])) {
                return false;
            }
        } else if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}
