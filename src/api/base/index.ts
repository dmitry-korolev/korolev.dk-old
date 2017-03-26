import * as debug from 'debug';
import { Service } from 'feathers-nedb';
import * as NeDB from 'nedb';

const assocPath = require('ramda/src/assocPath');
const lens = require('ramda/src/lens');
const path = require('ramda/src/path');
const set = require('ramda/src/set');
const view = require('ramda/src/view');

// Models
import { IJSONData } from 'models/api';
import IDebugger = debug.IDebugger;

type IMapCache<T> = Map<string, T>;
interface ICachedQueries {
    find: IMapCache<IJSONData[]>;
    get: IMapCache<IJSONData>;
}

interface ICreateServiceOptions {
    serviceName: string;
    incremental?: boolean;
    cacheable?: boolean;
    Model: any;
    pagination?: any;
}

const optionLastId = 'last_id';
const sortL = lens(path(['query', '$sort']), assocPath(['query', '$sort']));

export class BaseService extends Service {
    private logInfo: IDebugger;
    private logError: IDebugger;
    private serviceName: string;
    private incremental: boolean;
    private cacheable: boolean;
    private cachedQueries: ICachedQueries;
    private isCreationInProcess: boolean;
    private creationQueue: Map<string, any>;
    private optionsService: any;

    constructor({
        serviceName,
        incremental = false,
        cacheable = true,
        pagination,
        Model
    }: ICreateServiceOptions) {
        super({ Model, pagination });

        this.serviceName = serviceName;
        this.incremental = incremental;
        this.cacheable = cacheable;
        this.isCreationInProcess = false;
        this.cachedQueries = {
            find: new Map(),
            get: new Map()
        };
        this.creationQueue = new Map();

        this.logInfo = debug(`k:db:${serviceName}:info`);
        this.logError = debug(`k:db:${serviceName}:error`);

        if (this.incremental) {
            Model.ensureIndex({
                fieldName: 'id',
                unique: true,
                sparse: true
            });
        }

        this.clearCache = this.clearCache.bind(this);
    }

    private clearCache(data?: any): any {
        const methods = ['find', 'get'];

        methods.forEach((method: string): void => {
            this.cachedQueries[method].clear();
        });

        return data;
    }

    public async find(params?: any): Promise<IJSONData[]> {
        if (this.incremental && !view(sortL, params)) {
            params = set(sortL, {
                id: -1
            }, params);
        }

        const key = JSON.stringify(params);

        if (this.cacheable && this.cachedQueries.find.has(key)) {
            this.logInfo('Found cached FIND query', params);
            return this.cachedQueries.find.get(key);
        }

        this.logInfo('FIND', params);

        const result = await super.find(params);

        if (this.cacheable) {
            this.cachedQueries.find.set(key, result);
        }

        return result;
    }

    public async get(id: any, params: any): Promise<IJSONData> {
        const key = JSON.stringify([id, params]);

        if (this.cacheable && this.cachedQueries.get.has(key)) {
            this.logInfo('Found cached GET query', id, params);
            return this.cachedQueries.get.get(key);
        }

        this.logInfo('GET', id, params);

        const result = await super.get(id, params);

        if (this.cacheable) {
            this.cachedQueries.get.set(key, result);
        }

        return result;
    }

    private async createNormal(data: any, params: any): Promise<IJSONData> {
        this.logInfo('POST', data, params);

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
        const serviceLastId = await this.optionsService.get(optionLastId) || { value: -1 };
        const newId = serviceLastId.value + 1;

        await newId > 0
            ? this.optionsService.update(optionLastId, { value: newId, internal: true })
            : this.optionsService.create({ _id: optionLastId, value: newId, internal: true });

        data.id = newId;
        data._id = String(newId);

        return this.createNormal(data, params);
    }

    public async create(data: any, params: any): Promise<IJSONData> {
        data.created = new Date();

        if (this.isCreationInProcess) {
            this.logInfo('Found active CREATE request, moving request to queue');
            return new Promise<IJSONData>((resolve: Function): void => {
                this.creationQueue.set(JSON.stringify([data, params]), {
                    data,
                    params,
                    resolve
                });
            });
        }

        this.isCreationInProcess = true;

        return this.incremental
            ? this.createIncremental(data, params)
            : this.createNormal(data, params);
    }

    public async update(id: number, data: any, params: any): Promise<IJSONData> {
        data.updated = new Date();
        this.logInfo('PUT', id, data, params);

        const result = await super.update(id, data, params);
        await this.clearCache();

        return result;
    }

    public async patch(id: any, data: any, params: any): Promise<IJSONData> {
        this.logInfo('PATCH', id, data, params);

        const result = await super.patch(id, data, params);
        await this.clearCache();

        return result;
    }

    public async remove(id: any, params: any): Promise<IJSONData> {
        this.logInfo('DELETE', id, params);

        const result = await super.remove(id, params);
        await this.clearCache();

        return result;
    }

    public setup(app: any): void {
        this.optionsService = app.service('/api/options');
    }
}

export const createBaseService = (name: string): any => {
    const db = new NeDB({
        filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${name}`,
        autoload: true
    });

    return new BaseService({
        serviceName: name,
        incremental: true,
        Model: db
    });
};
