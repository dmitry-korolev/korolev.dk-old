import { ICommonReducer } from 'models/flux';

export interface IHeadline {
    id?: number;
    content: string;
    created?: string;
    updated?: string;
}

export interface IHeadlines extends ICommonReducer  {
    headlines: number[];
    headlinesById: {
        [K: number]: IHeadline
    };
    current: IHeadline;
}
