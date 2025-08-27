export type BracketCallback = (iteration: number, name?: string) => string;
export type BracketType = 'round' | 'square' | 'curly' | 'angle' | 'none';
export type FormatCallback = (name: string, iteration: string, separator: string) => string;
export type IterativeNameOptions = {
    bracket?: BracketType;
    bracketCallback?: BracketCallback;
    firstIteration?: number;
    formatCallback?: FormatCallback;
    separator?: string;
};
export declare function generateIterativeName(name: string, existingNames: string[], options?: IterativeNameOptions): string;
