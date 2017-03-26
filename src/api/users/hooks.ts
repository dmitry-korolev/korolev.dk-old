import { restrictToAdmin } from 'api/hooks';

import { IHooks } from 'models/api';

const usersBeforeHooks = (): IHooks => restrictToAdmin();

export { usersBeforeHooks }
