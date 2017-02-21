import { ICategory, IPost } from '../models/content';
const map = require('ramda/src/map');
import { IStore } from 'models/store';

export const getPostFromState = (state: IStore, postId: number): {
    post: IPost,
    categories: ICategory[]
} => {
    const {
        posts,
        categories
    } = state;
    const post = posts.postsById[postId];

    return {
        post,
        categories: map((categoryId: number) => categories.categoriesById[categoryId], post.categories)
    };
};
