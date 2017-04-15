import {
    find,
    map,
    path,
    pathOr,
    prop,
    propEq
} from 'utils/ramda';

import { IPost, IPosts } from 'models/posts';
import { ITag } from 'models/tags';
import { IStore } from 'models/store';

const postOrEmpty = (postId: string, posts: IPosts): IPost => pathOr({ tags: [] }, ['itemsById', postId], posts);

export const getTagBySlug =
    (slug: string, tags: ITag[]): ITag =>
        find(propEq('slug', slug), tags);

export const getPostFromState = ({ posts, tags }: IStore, postId: string): {
    post: IPost,
    tags: ITag[]
} => {
    const post = postOrEmpty(postId, posts);

    return {
        post,
        tags: map((_id: number) => path(['itemsById', _id], tags), prop('tags', post))
    };
};
