import { BaseService } from 'api/base';
import * as NeDB from 'nedb';

const usersDb = new NeDB({
    filename: `db/${process.env === 'production' ? 'prod' : 'dev'}/users`,
    autoload: true
});

usersDb.ensureIndex({
    fieldName: 'id',
    unique: true,
    sparse: true
});

const usersService = new BaseService({
    serviceName: 'users',
    incremental: true,
    Model: usersDb
});

export {
    usersService
};
