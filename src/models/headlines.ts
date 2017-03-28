import { ICommonReducer } from 'models/flux';

export interface IHeadline {
    _created?: string;
    _id?: string;
    _updated?: string;
    content: string;
}

export interface IHeadlines extends ICommonReducer  {
    headlines: number[];
    headlinesById: {
        [K: string]: IHeadline
    };
    current: IHeadline;
}
