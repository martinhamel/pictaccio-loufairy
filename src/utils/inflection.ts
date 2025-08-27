const SPLIT_NOT_ALPHANUMERICAL_REGEX = /[^a-z\d]+/i;
const SPLIT_LOWER_UPPER_NUMERICAL_REGEX = /([a-z])([A-Z\d])/g;
const SPLIT_NUMERICAL_ALPHA = /(\d)([a-z])/gi;

/**
 * This function first find all lowercase directly followed by a uppercase and split them with a space
 * Then create an array where the values are group of letters separated by anything not a letter
 */
function separate(input) {
    return input
        .replaceAll(SPLIT_LOWER_UPPER_NUMERICAL_REGEX, '$1 $2')
        .replaceAll(SPLIT_NUMERICAL_ALPHA, '$1 $2')
        .split(SPLIT_NOT_ALPHANUMERICAL_REGEX);
}

/**
 * This function first create an array from the string in @param input
 * Then for each values inside it check if its the first value and if @param firstLowerCase is true,
 * in which case the value is transform to all lowercase, otherwise the word is treated as any other value
 * take the first letter and capitalize it and lowercase other letter
 * Then append it to a const that will be returned
 * @param input {string}
 * @param firstLowerCase {boolean} optional, true = camelCase | false = PascalCase
 */
export function camelize(input: string, firstLowerCase = true): string {
    const parts = separate(input);
    let output = '';
    for (let i = 0, length = parts.length; i < length; ++i) {
        output += (
            firstLowerCase && !i ? parts[i][0].toLowerCase() : parts[i][0].toUpperCase()) + parts[i].substr(1).toLowerCase();
    }
    return output;
}

/**
 * This function first create an array from the string in @param input
 * Then for each values inside it set the letters to lowercase and and add a dash after except it's the last value
 * Then append it to a const that will be returned
 * @param input {string}
 */
export function dasherize(input: string): string {
    const parts = separate(input);
    let output = '';
    for (let i = 0, length = parts.length; i < length; ++i) {
        output += parts[i].toLowerCase() + (i < length -1 ? '-' : '');
    }
    return output;
}

/**
 * This function first create an array from the string in @param input
 * Then for each values inside it set the letters to lowercase and and add a underscore after except it's the last value
 * Then append it to a const that will be returned
 * @param input {string}
 */
export function underscorize(input: string): string {
    const parts = separate(input);
    let output = '';
    for (let i = 0, length = parts.length; i < length; ++i) {
        output += parts[i].toLowerCase() + (i < length - 1 ? '_' : '');
    }
    return output;
}

/**
 * This function capitalize the first letter of the string in @param input and lowercase the rest
 * @param input
 */
export function capitalize(input: string): string {
    if (input.length === 0) {
        return '';
    }

    return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

/**
 * This function capitalize the first letter of each word in the string in @param input and lowercase the rest
 * @param input
 */
export function titleCase(input: string): string {
    if (input.length === 0) {
        return '';
    }

    return input.split(' ').map(capitalize).join(' ');
}
