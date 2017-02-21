const cache: Map<string, Response | IJSONData> = new Map();
const activeRequests: Map<string, Promise<Response | IJSONData>> = new Map();
const baseUrl = 'https://agenius.ru/wp-json/wp/v2/';

interface IRequestOptions {
    method: string;
    params?: { [K: string]: string };
    useCache?: boolean;
    type?: 'json';
    init?: RequestInit;
}

interface IJSONData {
    [K: string]: any;
}

const request = ({
    method,
    useCache = true,
    type = 'json',
    init = {}
}: IRequestOptions): Promise<Response | IJSONData> => {
    const url = baseUrl + method;
    const cacheKey = url + init.method + init.body + type;

    if (activeRequests.has(cacheKey)) {
        return activeRequests.get(cacheKey);
    }

    if (useCache && cache.has(cacheKey)) {
        return Promise.resolve(cache.get(cacheKey));
    }

    const result = fetch(baseUrl + method, init)
        .then((response: Response) => {
            if (type === 'json') {
                return response.json() as IJSONData;
            }

            return response as Response;
        })
        .then((response: Response | IJSONData ) => {
            if (useCache) {
                cache.set(cacheKey, response);
            }

            return response;
        });

    activeRequests.set(cacheKey, result);

    return result;
};

export {
    request
}
