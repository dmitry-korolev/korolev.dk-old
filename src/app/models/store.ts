import { IHeadlines } from 'models/headlines';
import { IApplication } from 'models/appication';

export interface IStore {
    headlines: IHeadlines;
    application: IApplication;
}
