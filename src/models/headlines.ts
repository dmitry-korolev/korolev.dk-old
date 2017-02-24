export interface IHeadline {
    id?: number;
    content: string;
    created?: string;
    updated?: string;
}

export interface IHeadlines {
    isFetching: boolean;
    error?: any;
    headlines: number[];
    headlinesById: {
        [K: number]: IHeadline
    };
    current: IHeadline;
}

export interface IHeadlinesAction {
    type: string;
    payload?: {
        headlines?: string[];
        message?: any;
    };
}
