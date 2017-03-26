import * as authentication from 'feathers-authentication';

import { baseService } from './base';
import { optionsService } from './options';
import { usersBeforeHooks, usersEndpoint } from './users';

export const setupApplication = (app: any): void => {
    app.configure(authentication({
        userEndpoint: usersEndpoint
    }));

    app.use('/api/headlines', baseService('headlines'));
    app.use(usersEndpoint, baseService('users'));
    app.use('/api/posts', baseService('posts'));
    app.use('/api/categories', baseService('categories'));
    app.use('/api/options', optionsService);

    app.service('/api/users').before(usersBeforeHooks());
};
