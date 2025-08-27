export function isInteger(value: any): boolean {
    const x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}
