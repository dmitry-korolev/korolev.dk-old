import { slugify } from 'transliteration';

const createSlug = (hook: { data: any }): void => {
    if (!hook.data._id) {
        hook.data._id = slugify(hook.data.title || hook.data.content.slice(0, 30));
    }
};

export { createSlug };
