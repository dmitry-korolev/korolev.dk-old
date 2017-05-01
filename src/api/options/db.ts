import * as NeDB from 'nedb';
import { dbPath } from 'utils/server';

import { optionsServiceName } from './serviceName';

const optionsDb = new NeDB({
    filename: dbPath(optionsServiceName),
    autoload: true
});

export {
    optionsDb
}
