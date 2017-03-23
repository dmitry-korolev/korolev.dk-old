import { IGetState } from 'models/store';
import { Dispatch } from 'redux';

export interface IAction {
    type: string;
    error?: boolean;
    payload?: any;
    meta?: any;
}

export type IAsyncAction = (dispatch: Dispatch<any>, getState: IGetState) => Promise<any>;

interface ICommonActionCreator<T> {
    (...args: any[]): T;
    actionName?: string;
    once?: boolean;
    onlyServer?: boolean;
    onlyClient?: boolean;
}

export type IAsyncActionCreator = ICommonActionCreator<IAsyncAction>;
export type IActionCreator = ICommonActionCreator<IAction>;
