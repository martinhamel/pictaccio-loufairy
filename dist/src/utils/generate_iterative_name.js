"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIterativeName = void 0;
const bracketCallbacks = {
    round: iteration => `(${iteration})`,
    square: iteration => `[${iteration}]`,
    curly: iteration => `{${iteration}}`,
    angle: iteration => `<${iteration}>`,
    none: iteration => iteration
};
function formatCallback(name, iteration, separator) {
    return `${name}${separator}${iteration}`;
}
function normalizeOptions(options) {
    return {
        firstIteration: 1,
        formatCallback: formatCallback,
        separator: ' ',
        ...options,
        bracketCallback: typeof options?.bracketCallback === 'function'
            ? options.bracketCallback
            : bracketCallbacks[options?.bracket || 'none']
    };
}
function generateIterativeName(name, existingNames, options) {
    const normalizedOptions = normalizeOptions(options);
    let nameAttempt = name;
    let i = normalizedOptions.firstIteration - 1;
    if (!existingNames.includes(name)) {
        return name;
    }
    do {
        i++;
        nameAttempt = normalizedOptions.formatCallback(name, normalizedOptions.bracketCallback(i, name), normalizedOptions.separator);
    } while (existingNames.includes(nameAttempt));
    return nameAttempt;
}
exports.generateIterativeName = generateIterativeName;
//# sourceMappingURL=generate_iterative_name.js.map