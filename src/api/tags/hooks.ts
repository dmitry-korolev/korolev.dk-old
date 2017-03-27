import { associateUser, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';

import { IHooks } from 'models/api';

const tagsBeforeHooks = (): IHooks => combineHooks(
    restrictToAdmin(),
    associateUser()
);

export {
    tagsBeforeHooks
}
