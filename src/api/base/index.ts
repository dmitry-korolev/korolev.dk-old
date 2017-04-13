import * as debug from 'debug';
import { Unprocessable } from 'feathers-errors';
import { Service } from 'feathers-nedb';

import {
    assocPath,
    lens,
    path,
    set,
    T,
    view
} from 'utils/server/ramda';

// Models
import { ValidateFunction } from 'ajv/lib/ajv';
import { IPaginationOptions } from 'models/pagination';
import IDebugger = debug.IDebugger;

type IMapCache<T> = Map<string, T>;
interface ICachedQueries<IType> {
    find: IMapCache<IType[]>;
    get: IMapCache<IType>;
}

interface ICreateServiceOptions {
    serviceName: string;
    incremental?: boolean;
    cacheable?: boolean;
    validator?: ValidateFunction;

    Model: any;
    paginate?: IPaginationOptions;
}

const sortL = lens(path(['query', '$sort']), assocPath(['query', '$sort']));
const methods = ['find', 'get'];

export class BaseService<IType> extends Service {
    private logInfo: IDebugger;
    private logError: IDebugger;
    private serviceName: string;
    private incremental: boolean;
    private cacheable: boolean;
    private optionsService: any;
    private validator: ValidateFunction;
    private cachedQueries: ICachedQueries<IType>;

    constructor({
        serviceName,
        incremental = false,
        cacheable = true,
        validator = T,
        paginate,
        Model
    }: ICreateServiceOptions) {
        super({ Model, paginate });

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
    }

    private clearCache(): void {
        methods.forEach((method: string): void => {
            this.cachedQueries[method].clear();
        });
    }

    public async find(params?: any): Promise<IType[]> {
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

    public async get(_id: string, params?: any): Promise<IType> {
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

    public async create(data: any, params: any): Promise<IType> {
        const valid = this.validator(data);

        if (!valid) {
            throw new Unprocessable('Check data!', this.validator.errors);
        }

        data._created = new Date();
        this.logInfo('POST', data, params);

        const result = await super.create(data, params);
        this.clearCache();

        return result;
    }

    public async update(_id: string, data: any, params: any): Promise<IType> {
        const entity = await this.get(_id, params);
        const valid = this.validator(Object.assign({}, entity, data));

        if (!valid) {
            throw new Unprocessable('Check data!', this.validator.errors);
        }

        data._updated = new Date();
        this.logInfo('PUT', _id, data, params);

        const result = await super.update(_id, data, params);
        this.clearCache();

        return result;
    }

    public async patch(_id: string, data: any, params: any): Promise<IType> {
        const entity = await this.get(_id, params);
        const valid = this.validator(Object.assign({}, entity, data));

        if (!valid) {
            throw new Unprocessable('Check data!', this.validator.errors);
        }

        this.logInfo('PATCH', _id, data, params);

        const result = await super.patch(_id, data, params);
        this.clearCache();

        return result;
    }

    public async remove(_id: number, params: any): Promise<IType> {
        this.logInfo('DELETE', _id, params);

        const result = await super.remove(_id, params);
        this.clearCache();

        return result;
    }

    public setup(app: any): void {
        this.optionsService = app.service('/api/options');
    }
}
