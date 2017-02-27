import { BaseService } from 'api/base';
import * as NeDB from 'nedb';

const headlinesDb = new NeDB({
    filename: `db/${process.env === 'production' ? 'prod' : 'dev'}/headlines`,
    autoload: true
});

headlinesDb.ensureIndex({
    fieldName: 'id',
    unique: true,
    sparse: true
});

const headlinesService = new BaseService({
    serviceName: 'headlines',
    incremental: true,
    Model: headlinesDb
});

export {
    headlinesService
};