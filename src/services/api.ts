import { IRequestOptions, request } from './request';

// Models
import { IJSONData } from 'models/api';
import { IStore } from 'models/store';

export const apiRequest = (options: IRequestOptions, store: IStore): Promise<Response | IJSONData> => {
    const baseUrl = store.application.localApi;

    return request({
        ...options,
        baseUrl
    }, store);
};
