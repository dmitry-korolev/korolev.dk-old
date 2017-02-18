export interface IFluxAction {
    type: string;
    error?: boolean;
    payload?: any;
    meta?: any;
}
