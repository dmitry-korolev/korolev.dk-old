import { ICategory, IPost } from 'models/content';
import { IStore } from 'models/store';

const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');
const map = require('ramda/src/map');

export const getCategoryBySlug =
    (slug: string, categories: ICategory[]): ICategory =>
        find(propEq('slug', slug), categories);

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
