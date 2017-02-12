const map = require('ramda/src/map');
import { IStore } from 'models/store';

export const getPostFromState = (state: IStore, postId: number) => {
    const {
        posts,
        categories
    } = state;
    const post = posts.postsById[postId];

    return {
        post,
        categories: map((categoryId) => categories.categoriesById[categoryId], post.categories)
    };
};
