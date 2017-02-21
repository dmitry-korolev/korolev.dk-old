import { IApplication } from 'models/appication';
import { ICategories, IPosts } from 'models/content';
import { IHeadlines } from 'models/headlines';

export interface IStore {
    headlines: IHeadlines;
    posts: IPosts;
    categories: ICategories;
    application: IApplication;
}

export type IGetState = () => IStore;
