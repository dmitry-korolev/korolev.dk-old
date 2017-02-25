import * as debug from 'debug';
import { Service } from 'feathers-nedb';
import * as NeDB from 'nedb';

import { updateItemId } from 'api/options';

// Models
import { IJSONData } from 'models/api';

type IMapCache<T> = Map<string, T>;
interface IActiveQueries {
    find: IMapCache<Promise<IJSONData[]>>;
    get: IMapCache<Promise<IJSONData>>;
}
interface ICachedQueries {
    find: IMapCache<IJSONData[]>;
    get: IMapCache<IJSONData>;
}

const createService = (serviceName: string): any => {
    const logInfo = debug(`k:db:${serviceName}:info`);
    const logError = debug(`k:db:${serviceName}:error`);
    const db = new NeDB({
        filename: `db/${process.env === 'production' ? 'prod' : 'dev'}/${serviceName}`,
        autoload: true
    });

    // Cache
    const activeQueries: IActiveQueries = {
        find: new Map(),
        get: new Map()
    };
    const cachedQueries: ICachedQueries = {
        find: new Map(),
        get: new Map()
    };
    const clearCache = (data: any): any => {
        const methods = ['find', 'get'];

        methods.forEach((method: string): void => {
            activeQueries[method].clear();
            cachedQueries[method].clear();
        });

        return data;
    };

    // Create queue
    let isCreationInProcess = false;
    const createQueue = new Map();

    db.ensureIndex({
        fieldName: 'id',
        unique: true,
        sparse: true
    });

    class CommonService extends Service {
        constructor(args: any) {
            super(args);
        };

        public find(params?: any): Promise<IJSONData[]> {
            // Add default sorting
            if (!params.query.$sort) {
                params.query.$sort = {
                    id: -1
                };
            }

            const key = JSON.stringify(params);

            if (activeQueries.find.has(key)) {
                logInfo('Found active FIND query', params);
                return activeQueries.find.get(key);
            }

            if (cachedQueries.find.has(key)) {
                logInfo('Found cached FIND query', params);
                return Promise.resolve(cachedQueries.find.get(key));
            }

            logInfo('FIND', params);

            const result = super.find(params);

            activeQueries.find.set(key, result);

            result
                .then((data: IJSONData[]): Promise<IJSONData[]> => {
                    activeQueries.find.delete(key);
                    cachedQueries.find.set(key, data);

                    return Promise.resolve(data);
                })
                .catch((error: any) => {
                    logError(error);

                    return Promise.resolve([]);
                });

            return result;
        }

        public get(id: any, params: any): Promise<IJSONData> {
            const key = JSON.stringify([id, params]);

            if (activeQueries.get.has(key)) {
                logInfo('Found active GET query', id, params);
                return activeQueries.get.get(key);
            }

            if (cachedQueries.get.has(key)) {
                logInfo('Found cached GET query', id, params);
                return Promise.resolve(cachedQueries.get.get(key));
            }

            logInfo('GET', id, params);

            const result = super.get(id, params);

            activeQueries.get.set(key, result);

            result
                .then((data: IJSONData): Promise<IJSONData> => {
                    activeQueries.get.delete(key);
                    cachedQueries.get.set(key, data);

                    return Promise.resolve(data);
                })
                .catch((error: any) => {
                    logError(error);

                    return Promise.resolve({});
                });

            return result;

        }

        public create(data: any, params: any): Promise<IJSONData> {
            data.created = new Date();

            if (isCreationInProcess) {
                logInfo('Found active CREATE request, moving request to queue');
                return new Promise((resolve: Function): void => {
                    createQueue.set(JSON.stringify([data, params]), {
                        data,
                        params,
                        resolve
                    });
                });
            }

            isCreationInProcess = true;

            // Get new item id from options db
            return updateItemId(serviceName)
                .then((newId: number): Promise<IJSONData> => {
                    data.id = newId;
                    data._id = String(data.id); // For querying
                    logInfo('POST', data, params);

                    return super.create(data, params)
                        .then(clearCache)
                        .then((result: IJSONData): Promise<IJSONData> => {
                            isCreationInProcess = false;

                            if (createQueue.size) {
                                // Getting the first element in queue (FIFO)
                                const [[key, value]] = createQueue.entries();
                                createQueue.delete(key);

                                this.create(value.data, value.params)
                                    .then(value.resolve);
                            }

                            return Promise.resolve(result);
                        });
                })
                .catch(logError);
        }

        public update(id: number, data: any, params: any): any {
            data.updated = new Date();
            logInfo('PUT', id, data, params);

            return super.update(id, data, params)
                .then(clearCache);
        }

        public patch(id: any, data: any, params: any): any {
            logInfo('PATCH', id, data, params);

            return super.patch(id, data, params)
                .then(clearCache);
        }

        public remove(id: any, params: any): any {
            logInfo('DELETE', id, params);

            return super.remove(id, params)
                .then(clearCache);
        }
    }

    return {
        db,
        service: new CommonService({
            Model: db
        })
    };
};

export {
    createService
};
