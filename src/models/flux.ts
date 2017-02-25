export interface IFluxAction {
    type: string;
    error?: boolean;
    payload?: any;
    meta?: any;
}

export interface IFluxActionCreator {
    (): any;
    once?: boolean;
    onlyServer?: boolean;
    onlyClient?: boolean;
}
