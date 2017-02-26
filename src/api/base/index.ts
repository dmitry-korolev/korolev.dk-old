import * as debug from 'debug';
import { Service } from 'feathers-nedb';

// Models
import { IJSONData } from 'models/api';
import IDebugger = debug.IDebugger;

type IMapCache<T> = Map<string, T>;
interface IActiveQueries {
    find: IMapCache<Promise<IJSONData[]>>;
    get: IMapCache<Promise<IJSONData>>;
}
interface ICachedQueries {
    find: IMapCache<IJSONData[]>;
    get: IMapCache<IJSONData>;
}

interface ICreateServiceOptions {
    serviceName: string;
    incremental?: boolean;
    Model: any;
    pagination?: any;
}

export class BaseService extends Service {
    private logInfo: IDebugger;
    private logError: IDebugger;
    private serviceName: string;
    private incremental: boolean;
    private activeQueries: IActiveQueries;
    private cachedQueries: ICachedQueries;
    private isCreationInProcess: boolean;
    private creationQueue: Map<string, any>;
    private optionsService: any;

    constructor({
        serviceName,
        incremental = false,
        ...rest
    }: ICreateServiceOptions) {
        super(rest);

        this.serviceName = serviceName;
        this.incremental = incremental;
        this.isCreationInProcess = false;
        this.cachedQueries = {
            find: new Map(),
            get: new Map()
        };
        this.activeQueries =  {
            find: new Map(),
            get: new Map()
        };
        this.creationQueue = new Map();

        this.logInfo = debug(`k:db:${serviceName}:info`);
        this.logError = debug(`k:db:${serviceName}:error`);

        this.clearCache = this.clearCache.bind(this);
    }

    private clearCache(data?: any): any {
        const methods = ['find', 'get'];

        methods.forEach((method: string): void => {
            this.activeQueries[method].clear();
            this.cachedQueries[method].clear();
        });

        return data;
    }

    public find(params?: any): Promise<IJSONData[]> {
        if (this.incremental && !params.query.$sort) {
            params.query.$sort = {
                id: -1
            };
        }

        const key = JSON.stringify(params);
        const activeQueries = this.activeQueries.find;
        const cachedQueries = this.cachedQueries.find;

        if (activeQueries.has(key)) {
            this.logInfo('Found active FIND query', params);
            return activeQueries.get(key);
        }

        if (cachedQueries.has(key)) {
            this.logInfo('Found cached FIND query', params);
            return Promise.resolve(cachedQueries.get(key));
        }

        this.logInfo('FIND', params);

        const result = super.find(params)
            .then((data: IJSONData[]): Promise<IJSONData[]> => {
                activeQueries.delete(key);
                cachedQueries.set(key, data);

                return Promise.resolve(data);
            })
            .catch((error: any) => {
                this.logError(error);

                return Promise.resolve([]);
            });

        activeQueries.set(key, result);

        return result;
    }

    public get(id: any, params: any): Promise<IJSONData> {
        const key = JSON.stringify([id, params]);
        const activeQueries = this.activeQueries.get;
        const cachedQueries = this.cachedQueries.get;

        if (activeQueries.has(key)) {
            this.logInfo('Found active GET query', id, params);
            return activeQueries.get(key);
        }

        if (cachedQueries.has(key)) {
            this.logInfo('Found cached GET query', id, params);
            return Promise.resolve(cachedQueries.get(key));
        }

        this.logInfo('GET', id, params);

        const result = super.get(id, params)
            .then((data: IJSONData): Promise<IJSONData> => {
                activeQueries.delete(key);
                cachedQueries.set(key, data);

                return Promise.resolve(data);
            })
            .catch((error: any) => {
                this.logError(error);

                return Promise.resolve({});
            });

        activeQueries.set(key, result);

        return result;
    }

    private async createNormal(data: any, params: any): Promise<IJSONData> {
        const result = await super.create(data, params);
        await this.clearCache();

        this.isCreationInProcess = false;

        if (this.creationQueue.size) {
            // Getting the first element in queue (FIFO)
            const [[key, value]] = this.creationQueue.entries();
            this.creationQueue.delete(key);

            await this.create(value.data, value.params)
                .then(value.resolve);
        }

        return result;
    }

    private createIncremental(data: any, params: any): Promise<IJSONData> {
        const id = `${this.serviceName}_last_id`;

        // Get new item id from options headlinesDb

        return this.optionsService.get(id)
            .then((lastId: IJSONData): Promise<number> => {
                const newId = (lastId || { value: -1 }).value + 1;

                return lastId
                    ? this.optionsService.update(id, { value: newId })
                    : this.optionsService.create({ _id: id, value: newId });
            })
            .then((newId: IJSONData): Promise<IJSONData> => {
                data.id = newId.value;
                data._id = String(data.id); // For querying
                this.logInfo('POST', data, params);

                return this.createNormal(data, params);
            });
    }

    public create(data: any, params: any): Promise<IJSONData> {
        data.created = new Date();

        if (this.isCreationInProcess) {
            this.logInfo('Found active CREATE request, moving request to queue');
            return new Promise((resolve: Function): void => {
                this.creationQueue.set(JSON.stringify([data, params]), {
                    data,
                    params,
                    resolve
                });
            });
        }

        this.isCreationInProcess = true;

        return (
            this.incremental
            ? this.createIncremental(data, params)
            : this.createNormal(data, params)
        )
            .catch(this.logError);
    }

    public update(id: number, data: any, params: any): any {
        data.updated = new Date();
        this.logInfo('PUT', id, data, params);

        return super.update(id, data, params)
            .then(this.clearCache);
    }

    public patch(id: any, data: any, params: any): any {
        this.logInfo('PATCH', id, data, params);

        return super.patch(id, data, params)
            .then(this.clearCache);
    }

    public remove(id: any, params: any): any {
        this.logInfo('DELETE', id, params);

        return super.remove(id, params)
            .then(this.clearCache);
    }

    public setup(app: any): void {
        this.optionsService = app.service('options');
    }
}
