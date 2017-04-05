import * as NeDB from 'nedb';
import { optionsServiceName } from './serviceName';

const optionsDb = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${optionsServiceName}`,
    autoload: true
});

export {
    optionsDb
}
