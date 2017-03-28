import { ICommonReducer } from 'models/flux';

export interface IPost {
    _created: string;
    _id: string;
    _updated?: string;
    author: string;
    content: string;
    excerpt?: string;
    format: 'standard';
    slug: string;
    status: 'draft' | 'publish';
    sticky: boolean;
    subtitle?: string;
    tags?: number[];
    title?: string;
    type: 'page' | 'post';
}

export interface IPosts extends ICommonReducer {
    posts: number[];
    postsById: {
        [K: string]: IPost
    };
    total: number;
}

export interface IPage {
    _created: string;
    _id: string;
    _updated?: string;
    author: string;
    content: string;
    slug: string;
    status: 'draft' | 'publish';
    title?: string;
}

export interface IPages extends ICommonReducer {
    pages: number[];
    pagesById: {
        [K: string]: IPage
    };
}

export interface ITag {
    _count: number;
    _created: string;
    _id: string;
    _updated?: string;
    author: string;
    description?: string;
    slug: string;
    taxonomy: 'categories' | 'tags';
    title: string;
}

export interface ITags extends ICommonReducer {
    tags: number[];
    tagsById: {
        [K: string]: ITag
    };
}

export interface IGetPosts {
    page?: number;
    perPage?: number;
    offset?: number;
    order?: 'asc' | 'desc';
}
