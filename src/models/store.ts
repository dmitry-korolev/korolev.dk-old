import { IApplication } from 'models/appication';
import { IPosts, ITags } from 'models/content';
import { IHeadlines } from 'models/headlines';
import { IUser } from 'models/user';
import { Store } from 'redux';

export interface IStore {
    headlines: IHeadlines;
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

export interface IAsyncConnectArguments {
    store: Store<IStore>;
    params?: IRouteParams;
}

export interface IAsyncConnectOwnProps {
    params: IRouteParams;
}

export type IGetState = () => IStore;
