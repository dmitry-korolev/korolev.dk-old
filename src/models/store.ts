import { IApplication } from 'models/appication';
import { IHeadlines } from 'models/headlines';
import { IPages } from 'models/pages';
import { IPaginationReducerState } from 'models/pagination';
import { IPosts } from 'models/posts';
import { ITags } from 'models/tags';
import { IUser } from 'models/user';
import { Store } from 'redux';

export interface IStore {
    headlines: IHeadlines;
    pages: IPages;
    pagination: IPaginationReducerState;
    posts: IPosts;
    tags: ITags;
    application: IApplication;
    user: IUser;
}

interface IRouteParams {
    tagId?: string;
    postId?: string;
    pageId?: string;
    pageNumber?: number;
}

export interface IConnectArguments {
    store?: Store<IStore>;
    params?: IRouteParams;
}

export interface IAsyncConnectOwnProps {
    params?: IRouteParams;
}

export type IGetState = () => IStore;
