const bracketCallbacks = {
    round: iteration => `(${iteration})`,
    square: iteration => `[${iteration}]`,
    curly: iteration => `{${iteration}}`,
    angle: iteration => `<${iteration}>`,
    none: iteration => iteration
};

function formatCallback(name: string, iteration: string, separator: string): string {
    return `${name}${separator}${iteration}`;
}

function normalizeOptions(options?: IterativeNameOptions): IterativeNameOptions {
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

export type BracketCallback = (iteration: number, name?: string) => string;

export type BracketType = 'round' | 'square' | 'curly' | 'angle' | 'none';

export type FormatCallback = (name: string, iteration: string, separator: string) => string;

export type IterativeNameOptions = {
    bracket?: BracketType,
    bracketCallback?: BracketCallback,
    firstIteration?: number,
    formatCallback?: FormatCallback
    separator?: string,
}

export function generateIterativeName(name: string, existingNames: string[], options?: IterativeNameOptions): string {
    const normalizedOptions = normalizeOptions(options);
    let nameAttempt = name;
    let i = normalizedOptions.firstIteration - 1;

    if (!existingNames.includes(name)) {
        return name;
    }

    do {
        i++;
        nameAttempt = normalizedOptions.formatCallback(
            name,
            normalizedOptions.bracketCallback(i, name),
            normalizedOptions.separator
        );
    } while (existingNames.includes(nameAttempt));

    return nameAttempt;
}
