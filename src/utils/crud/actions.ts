import { createAction, toCamelCase } from 'utils';
import { allTypes } from './constants';

import { ICrudActionCreators } from 'models/crud';

const forEach = require('ramda/src/forEach');
const zipObj = require('ramda/src/zipObj');

export const generateActions = <IItem>(serviceName: string): ICrudActionCreators<IItem> => {
    const tKeys = [];
    const tActions = [];

    forEach((type: string): void => {
        tKeys.push(toCamelCase(type));
        tActions.push(createAction(`${serviceName}/${type}`));
    }, allTypes);

    return zipObj(tKeys, tActions);
};
