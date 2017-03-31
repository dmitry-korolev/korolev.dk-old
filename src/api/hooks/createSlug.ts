import { slugify } from 'transliteration';

const createSlug = (hook: { data: any }): void => {
    hook.data._id = slugify(
        hook.data._id || hook.data.title || hook.data.content.slice(0, 30)
    );
};

export { createSlug };
