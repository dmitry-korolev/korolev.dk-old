import { IPost, IPosts } from 'models/posts';
import { ITag } from 'models/tags';
import { IStore } from 'models/store';

const find = require('ramda/src/find');
const path = require('ramda/src/path');
const pathOr = require('ramda/src/pathOr');
const prop = require('ramda/src/prop');
const propEq = require('ramda/src/propEq');
const map = require('ramda/src/map');

const postOrEmpty = (postId: number, posts: IPosts): IPost => pathOr({ tags: [] }, ['itemsById', postId], posts);

export const getTagBySlug =
    (slug: string, tags: ITag[]): ITag =>
        find(propEq('slug', slug), tags);

export const getPostFromState = ({ posts, tags }: IStore, postId: number): {
    post: IPost,
    tags: ITag[]
} => {
    const post = postOrEmpty(postId, posts);

    return {
        post,
        tags: map((_id: number) => path(['itemsById', _id], tags), prop('tags', post))
    };
};
