type makeExcerptN = (input: string) => string;
const makeExcerpt = (maxLength: number): makeExcerptN => (input: string): string =>
    (input.length > maxLength ? input.slice(0, maxLength) + '...' : input);

export {
    makeExcerpt
};
