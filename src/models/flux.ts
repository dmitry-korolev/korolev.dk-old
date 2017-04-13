import { IGetState, IStore } from 'models/store';
import { Action, Dispatch } from 'redux';

export interface IAction extends Action {
    error?: boolean;
    payload?: any;
    meta?: any;
}

export type IAsyncAction = (dispatch: Dispatch<IStore>, getState: IGetState) => Promise<void>;
export type IReducer<IState> = (state: IState, action: IAction) => IState;

export interface ICommonActionCreator<TResult, Options> {
    (options?: Options): TResult;
    actionName?: string;
    once?: boolean;
    onlyServer?: boolean;
    onlyClient?: boolean;
}

export type IAsyncActionCreator<Options> = ICommonActionCreator<IAsyncAction, Options>;
export type IActionCreator<Options> = ICommonActionCreator<IAction, Options>;

export interface ICommonFetch {
    isFetching?: boolean;
    error?: boolean;
    errorMessage?: Error;
}

export interface ICommonReducerState<IItem> extends ICommonFetch {
    itemsById?: {
        [K: string]: IItem
    };
}
