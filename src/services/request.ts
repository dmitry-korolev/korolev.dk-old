const cache = new Map();
const activeRequests = new Map();
const baseUrl = 'https://agenius.ru/wp-json/wp/v2/';

interface IRequestOptions {
    method: string;
    params?: { [K: string]: string };
    useCache?: boolean;
    type?: 'json';
    init?: RequestInit;
}

const request = ({
    method,
    useCache = true,
    type = 'json',
    init = {}
}: IRequestOptions) => {
    const url = baseUrl + method;
    const cacheKey = url + init.method + init.body + type;

    if (activeRequests.has(cacheKey)) {
        return activeRequests.get(cacheKey);
    }

    if (useCache && cache.has(cacheKey)) {
        return Promise.resolve(cache.get(cacheKey));
    }

    const result = fetch(baseUrl + method, init)
        .then((response) => {
            if (type === 'json') {
                return response.json();
            }

            return response;
        })
        .then((response) => {
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
