import { ICommonReducerState } from 'models/flux';

export interface IPage {
    _created: string;
    _id: string;
    _updated?: string;
    author: string;
    content: string;
    status: 'draft' | 'publish';
    title?: string;
}

export type IPages = ICommonReducerState<IPage>;
