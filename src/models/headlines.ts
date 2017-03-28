import { ICommonReducer } from 'models/flux';

export interface IHeadline {
    _id?: string;
    content: string;
    created?: string;
    updated?: string;
}

export interface IHeadlines extends ICommonReducer  {
    headlines: number[];
    headlinesById: {
        [K: string]: IHeadline
    };
    current: IHeadline;
}
