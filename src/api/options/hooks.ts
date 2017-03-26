import { associateUser, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';

import { IHooks } from 'models/api';

const optionsBeforeHooks = (): IHooks => combineHooks(
    restrictToAdmin(),
    associateUser()
);

export {
    optionsBeforeHooks
}
