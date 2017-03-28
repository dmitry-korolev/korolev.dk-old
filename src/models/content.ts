import { ICommonReducer } from 'models/flux';

export interface IPost {
    _id: string;
    author: string;
    content: string;
    created: string;
    excerpt?: string;
    format: 'standard';
    modified?: string;
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

export interface ITag {
    _id: string;
    count: number;
    created: string;
    description?: string;
    modified?: string;
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
