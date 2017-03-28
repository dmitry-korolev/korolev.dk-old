import { IPost, ITag } from 'models/content';
import { IStore } from 'models/store';

const find = require('ramda/src/find');
const path = require('ramda/src/path');
const prop = require('ramda/src/prop');
const propEq = require('ramda/src/propEq');
const map = require('ramda/src/map');

export const getTagBySlug =
    (slug: string, tags: ITag[]): ITag =>
        find(propEq('slug', slug), tags);

export const getPostFromState = ({ posts, tags }: IStore, postId: number): {
    post: IPost,
    tags: ITag[]
} => {
    const post = path(['postsById', postId], posts);

    return {
        post,
        tags: map((_id: number) => path(['tagsById', _id], tags), prop('tags', post))
    };
};
