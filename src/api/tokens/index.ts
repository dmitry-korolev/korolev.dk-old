import * as service from 'feathers-nedb';
import * as NeDB from 'nedb';

const tokensDb = new NeDB({
    filename: `db/${process.env === 'production' ? 'prod' : 'dev'}/tokens`,
    autoload: true
});

const tokensService = service({
    Model: tokensDb
});

export {
    tokensService
};
