export interface IJSONData {
    [K: string]: any;
}

export interface IHooks {
    find?: any[];
    get?: any[];
    create?: any[];
    update?: any[];
    patch?: any[];
    remove?: any[];
}
