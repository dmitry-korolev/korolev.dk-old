import {
    map,
    path,
    pathOr,
    propOr
} from 'utils/ramda';

import { IPost, IPosts } from 'models/posts';
import { IPage, IPages } from 'models/pages';
import { ITag } from 'models/tags';
import { IStore } from 'models/store';

const postOrEmpty = (postId: string, posts: IPosts): IPost => pathOr({}, ['itemsById', postId], posts);
const pageOrEmpty = (pageId: string, pages: IPages): IPage => pathOr({}, ['itemsById', pageId], pages);

export const getPostFromState = ({ posts, tags }: IStore, postId: string): {
    item: IPost,
    tags: ITag[]
} => {
    const item = postOrEmpty(postId, posts);

    return {
        item,
        tags: map((_id: number) => path(['itemsById', _id], tags), propOr([], 'tags', item))
    };
};

export const getPageFromState = ({ pages }: IStore, pageId: string): { item: IPage } => ({
    item: pageOrEmpty(pageId, pages)
});
