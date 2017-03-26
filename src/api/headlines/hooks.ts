import { associateUser, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';

import { IHooks } from 'models/api';

const headlinesBeforeHooks = (): IHooks => combineHooks(
    restrictToAdmin(),
    associateUser()
);

export {
    headlinesBeforeHooks
}
