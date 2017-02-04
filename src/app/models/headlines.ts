export interface IHeadlines {
    isFetching: boolean;
    error?: boolean;
    message?: any;
    headlines: string[];
}

export interface IHeadlinesAction {
    type: string;
    payload?: {
        headlines?: string[];
        message?: any;
    };
}
