import { toCamelCase } from 'utils';
import { allTypes } from './constants';

import { ICrudActionTypes } from 'models/crud';

const forEach = require('ramda/src/forEach');
const zipObj = require('ramda/src/zipObj');

export const generateTypes = (serviceName: string): ICrudActionTypes => {
    const tKeys = [];
    const tValues = [];

    forEach((type: string): void => {
        tKeys.push(toCamelCase(type));
        tValues.push(`${serviceName}/${type}`);
    }, allTypes);

    return zipObj(tKeys, tValues);
};
