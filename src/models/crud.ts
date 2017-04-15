import { IActionCreator, IAsyncActionCreator, ICommonReducerState, IReducer } from 'models/flux';
import { IPaginationQuery } from 'models/pagination';

export interface ICrudActionTypes {
    fetchStart: string;
    fetchSuccess: string;
    fetchError: string;
}

export interface ICrudActionCreators<IItem> {
    fetchStart: IActionCreator<void>;
    fetchSuccess: IActionCreator<IItem[]>;
    fetchError: IActionCreator<Error>;
}

export interface IQuery {
    pageNumber?: number;
}

export interface ICrudOptions<IReducerState> {
    serviceName: string;
    initialState?: IReducerState;
}

export interface ICRUD<IItem> {
    reducer: IReducer<ICommonReducerState<IItem>>;
    find: IAsyncActionCreator<IFindOptions>;
    get: IAsyncActionCreator<string>;
}

export interface IFindOptions {
    query?: IQuery;
    pagination?: IPaginationQuery;
}
