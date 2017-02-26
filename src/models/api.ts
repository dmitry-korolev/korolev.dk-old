export interface IJSONData {
    [K: string]: any;
}

export interface IReturnData<T> {
    resultCode: 'OK' | 'Error';
    errorMessage?: string;
    payload?: T;
}
