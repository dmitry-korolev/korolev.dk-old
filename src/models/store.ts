import { IApplication } from 'models/appication';
import { ICategories, IPosts } from 'models/content';
import { IHeadlines } from 'models/headlines';
import { Dispatch } from 'redux';

export interface IStore {
    headlines: IHeadlines;
    posts: IPosts;
    categories: ICategories;
    application: IApplication;
}

interface IRouteParams {
    postId?: number;
    categoryName?: string;
}

export interface IAsyncConnectArguments {
    store: {
        dispatch: Dispatch<any>;
    };
    params: IRouteParams;
}

export interface IAsyncConnectOwnProps {
    params: IRouteParams;
}

export type IGetState = () => IStore;
