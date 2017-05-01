import * as NeDB from 'nedb';

import { BaseService } from 'api/base';
import { restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { dbPath, validateUser } from 'utils/server';

// Models
import { IHooks } from 'models/api';
import { IUser } from 'models/user';

const usersServiceName = 'users';

const db = new NeDB({
    filename: dbPath(usersServiceName),
    autoload: true
});

class UsersService extends BaseService<IUser> {
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
