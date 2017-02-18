import { IHeadlines } from 'models/headlines';
import { IApplication } from 'models/appication';
import { IPosts, ICategories } from 'models/content';

export interface IStore {
    headlines: IHeadlines;
    posts: IPosts;
    categories: ICategories;
    application: IApplication;
}

export type IGetState = () => IStore;
