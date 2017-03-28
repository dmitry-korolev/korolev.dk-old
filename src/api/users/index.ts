import * as NeDB from 'nedb';

import { BaseService } from 'api/base';
import { restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { validateUser } from 'utils/server';

// Models
import { IHooks } from 'models/api';

const usersServiceName = 'users';

const db = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${usersServiceName}`,
    autoload: true
});

class UsersService extends BaseService {
    public before: IHooks = combineHooks(
        restrictToAdmin()
    );
}

const usersService = (): any => new UsersService({
    serviceName: usersServiceName,
    validator: validateUser,
    Model: db
});

export {
    usersService,
    usersServiceName
};
