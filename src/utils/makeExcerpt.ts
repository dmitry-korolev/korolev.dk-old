const MAX_EXCERPT_LENGTH = 300;

const makeExcerpt = (input: string): string =>
    (input.length > MAX_EXCERPT_LENGTH ? input.slice(0, MAX_EXCERPT_LENGTH) + '...' : input);

export {
    makeExcerpt
};
