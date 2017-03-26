import { restrictToAdmin } from 'api/hooks';

// Models
import { IHooks } from 'models/api';

const usersBeforeHooks = (): IHooks => restrictToAdmin();

export {
    usersBeforeHooks
}
