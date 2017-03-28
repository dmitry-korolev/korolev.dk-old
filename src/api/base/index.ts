import * as debug from 'debug';
import { Unprocessable } from 'feathers-errors';
import { Service } from 'feathers-nedb';

const assocPath = require('ramda/src/assocPath');
const lens = require('ramda/src/lens');
const path = require('ramda/src/path');
const set = require('ramda/src/set');
const view = require('ramda/src/view');
const T = require('ramda/src/T');

// Models
import { ValidateFunction } from 'ajv/lib/ajv';
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
    validator?: ValidateFunction;

    Model: any;
    pagination?: any;
}

const sortL = lens(path(['query', '$sort']), assocPath(['query', '$sort']));

export class BaseService extends Service {
    private logInfo: IDebugger;
    private logError: IDebugger;
    private serviceName: string;
    private incremental: boolean;
    private cacheable: boolean;
    private optionsService: any;
    private validator: ValidateFunction;
    private cachedQueries: ICachedQueries;

    constructor({
        serviceName,
        incremental = false,
        cacheable = true,
        validator = T,
        pagination,
        Model
    }: ICreateServiceOptions) {
        super({ Model, pagination });

        this.serviceName = serviceName;
        this.incremental = incremental;
        this.cacheable = cacheable;
        this.validator = validator;

        this.cachedQueries = {
            find: new Map(),
            get: new Map()
        };

        this.logInfo = debug(`k:db:${serviceName}:info`);
        this.logError = debug(`k:db:${serviceName}:error`);

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
                created: -1
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

    public async get(_id: string, params?: any): Promise<IJSONData> {
        const key = JSON.stringify([_id, params]);

        if (this.cacheable && this.cachedQueries.get.has(key)) {
            this.logInfo('Found cached GET query', _id, params);
            return this.cachedQueries.get.get(key);
        }

        this.logInfo('GET', _id, params);

        const result = await super.get(_id, params);

        if (this.cacheable) {
            this.cachedQueries.get.set(key, result);
        }

        return result;
    }

    public async create(data: any, params: any): Promise<IJSONData> {
        const valid = this.validator(data);

        if (!valid) {
            throw new Unprocessable('Check data!', this.validator.errors);
        }

        data._created = new Date();
        this.logInfo('POST', data, params);

        const result = await super.create(data, params);
        await this.clearCache();

        return result;
    }

    public async update(_id: string, data: any, params: any): Promise<IJSONData> {
        const entity = await this.get(_id, params);
        const valid = this.validator({
            ...entity,
            ...data
        });

        if (!valid) {
            throw new Unprocessable('Check data!', this.validator.errors);
        }

        data._updated = new Date();
        this.logInfo('PUT', _id, data, params);

        const result = await super.update(_id, data, params);
        await this.clearCache();

        return result;
    }

    public async patch(_id: string, data: any, params: any): Promise<IJSONData> {
        const entity = await this.get(_id, params);
        const valid = this.validator({
            ...entity,
            ...data
        });

        if (!valid) {
            throw new Unprocessable('Check data!', this.validator.errors);
        }

        this.logInfo('PATCH', _id, data, params);

        const result = await super.patch(_id, data, params);
        await this.clearCache();

        return result;
    }

    public async remove(_id: number, params: any): Promise<IJSONData> {
        this.logInfo('DELETE', _id, params);

        const result = await super.remove(_id, params);
        await this.clearCache();

        return result;
    }

    public setup(app: any): void {
        this.optionsService = app.service('/api/options');
    }
}
