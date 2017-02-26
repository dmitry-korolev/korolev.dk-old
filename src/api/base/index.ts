import * as debug from 'debug';
import { Service } from 'feathers-nedb';

// Models
import { IJSONData, IReturnData } from 'models/api';
import IDebugger = debug.IDebugger;

type IMapCache<T> = Map<string, T>;
interface ICachedQueries {
    find: IMapCache<IReturnData<IJSONData[]>>;
    get: IMapCache<IReturnData<IJSONData>>;
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
        this.creationQueue = new Map();

        this.logInfo = debug(`k:db:${serviceName}:info`);
        this.logError = debug(`k:db:${serviceName}:error`);

        this.clearCache = this.clearCache.bind(this);
    }

    private async formatData(promise: Promise<any>): Promise<IReturnData<any>> {
        let error = null;
        const result = await promise.catch((e: Error): void => {
            this.logError(e);
            error = e;
        });

        if (error) {
            return {
                resultCode: 'Error',
                errorMessage: error.message
            };
        }

        return {
            resultCode: 'OK',
            payload: result
        };
    }

    private clearCache(data?: any): any {
        const methods = ['find', 'get'];

        methods.forEach((method: string): void => {
            this.cachedQueries[method].clear();
        });

        return data;
    }

    public async find(params?: any): Promise<IReturnData<IJSONData[]>> {
        if (this.incremental && !params.query.$sort) {
            params.query.$sort = {
                id: -1
            };
        }

        const key = JSON.stringify(params);

        if (this.cachedQueries.find.has(key)) {
            this.logInfo('Found cached FIND query', params);
            return this.cachedQueries.find.get(key);
        }

        this.logInfo('FIND', params);

        const result = await this.formatData(super.find(params));

        if (result.resultCode === 'OK') {
            this.cachedQueries.find.set(key, result);
        }

        return result;
    }

    public async get(id: any, params: any): Promise<IReturnData<IJSONData>> {
        const key = JSON.stringify([id, params]);

        if (this.cachedQueries.get.has(key)) {
            this.logInfo('Found cached GET query', id, params);
            return this.cachedQueries.get.get(key);
        }

        this.logInfo('GET', id, params);

        const result = await this.formatData(super.get(id, params));

        if (result.resultCode === 'OK') {
            this.cachedQueries.get.set(key, result);
        }

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

            value.resolve(await this.create(value.data, value.params));
        }

        return result;
    }

    private async createIncremental(data: any, params: any): Promise<IJSONData> {
        const id = `${this.serviceName}_last_id`;
        const lastId = await this.optionsService.get(id) || { value: -1 };
        const newId = lastId.value;

        await lastId
            ? this.optionsService.update(id, { value: newId })
            : this.optionsService.create({ _id: id, value: newId });

        data.id = newId;
        data._id = String(newId);

        this.logInfo('POST', data, params);

        return this.createNormal(data, params);
    }

    public async create(data: any, params: any): Promise<IReturnData<IJSONData>> {
        data.created = new Date();

        if (this.isCreationInProcess) {
            this.logInfo('Found active CREATE request, moving request to queue');
            return new Promise<IReturnData<IJSONData>>((resolve: Function): void => {
                this.creationQueue.set(JSON.stringify([data, params]), {
                    data,
                    params,
                    resolve
                });
            });
        }

        this.isCreationInProcess = true;

        return this.formatData(
            this.incremental
                ? this.createIncremental(data, params)
                : this.createNormal(data, params)
        );
    }

    public async update(id: number, data: any, params: any): Promise<IReturnData<IJSONData>> {
        data.updated = new Date();
        this.logInfo('PUT', id, data, params);

        const result = await this.formatData(super.update(id, data, params));
        await this.clearCache();

        return result;
    }

    public async patch(id: any, data: any, params: any): Promise<IReturnData<IJSONData>> {
        this.logInfo('PATCH', id, data, params);

        const result = await this.formatData(super.patch(id, data, params));
        await this.clearCache();

        return result;
    }

    public async remove(id: any, params: any): Promise<IReturnData<IJSONData>> {
        this.logInfo('DELETE', id, params);

        const result = await this.formatData(super.remove(id, params));
        await this.clearCache();

        return result;
    }

    public setup(app: any): void {
        this.optionsService = app.service('options');
    }
}
