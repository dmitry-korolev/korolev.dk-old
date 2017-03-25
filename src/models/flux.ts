import { IGetState, IStore } from 'models/store';
import { Action, Dispatch } from 'redux';

export interface IAction extends Action {
    error?: boolean;
    payload?: any;
    meta?: any;
}

export type IAsyncAction = (dispatch: Dispatch<IStore>, getState: IGetState) => Promise<void>;

export interface ICommonActionCreator<T, O> {
    (options?: O): T;
    actionName?: string;
    once?: boolean;
    onlyServer?: boolean;
    onlyClient?: boolean;
}

export type IAsyncActionCreator<O> = ICommonActionCreator<IAsyncAction, O>;
export type IActionCreator<O> = ICommonActionCreator<IAction, O>;

export interface ICommonReducer {
    isFetching: boolean;
    error?: boolean;
    errorMessage?: Error;
}
