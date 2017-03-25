import { IGetState } from 'models/store';
import { Action, Dispatch } from 'redux';

export interface IAction extends Action {
    error?: boolean;
    payload?: any;
    meta?: any;
}

export type IAsyncAction = (dispatch: Dispatch<any>, getState: IGetState) => Promise<any>;

export interface ICommonActionCreator<T> {
    (...args: any[]): T;
    actionName?: string;
    once?: boolean;
    onlyServer?: boolean;
    onlyClient?: boolean;
}

export type IAsyncActionCreator = ICommonActionCreator<IAsyncAction>;
export type IActionCreator = ICommonActionCreator<IAction>;

export interface ICommonReducer {
    isFetching: boolean;
    error?: boolean;
    errorMessage?: Error;
}
