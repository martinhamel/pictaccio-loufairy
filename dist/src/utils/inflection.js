"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleCase = exports.capitalize = exports.underscorize = exports.dasherize = exports.camelize = void 0;
const SPLIT_NOT_ALPHANUMERICAL_REGEX = /[^a-z\d]+/i;
const SPLIT_LOWER_UPPER_NUMERICAL_REGEX = /([a-z])([A-Z\d])/g;
const SPLIT_NUMERICAL_ALPHA = /(\d)([a-z])/gi;
function separate(input) {
    return input
        .replaceAll(SPLIT_LOWER_UPPER_NUMERICAL_REGEX, '$1 $2')
        .replaceAll(SPLIT_NUMERICAL_ALPHA, '$1 $2')
        .split(SPLIT_NOT_ALPHANUMERICAL_REGEX);
}
function camelize(input, firstLowerCase = true) {
    const parts = separate(input);
    let output = '';
    for (let i = 0, length = parts.length; i < length; ++i) {
        output += (firstLowerCase && !i ? parts[i][0].toLowerCase() : parts[i][0].toUpperCase()) + parts[i].substr(1).toLowerCase();
    }
    return output;
}
exports.camelize = camelize;
function dasherize(input) {
    const parts = separate(input);
    let output = '';
    for (let i = 0, length = parts.length; i < length; ++i) {
        output += parts[i].toLowerCase() + (i < length - 1 ? '-' : '');
    }
    return output;
}
exports.dasherize = dasherize;
function underscorize(input) {
    const parts = separate(input);
    let output = '';
    for (let i = 0, length = parts.length; i < length; ++i) {
        output += parts[i].toLowerCase() + (i < length - 1 ? '_' : '');
    }
    return output;
}
exports.underscorize = underscorize;
function capitalize(input) {
    if (input.length === 0) {
        return '';
    }
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
}
exports.capitalize = capitalize;
function titleCase(input) {
    if (input.length === 0) {
        return '';
    }
    return input.split(' ').map(capitalize).join(' ');
}
exports.titleCase = titleCase;
//# sourceMappingURL=inflection.js.map