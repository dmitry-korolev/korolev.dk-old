import * as authentication from 'feathers-authentication';

import { baseService } from 'api/base';
import { optionsService } from 'api/options';
import { postsBeforeHooks, postsEndpoint } from 'api/posts';
import { usersBeforeHooks, usersEndpoint } from 'api/users';

export const setupApplication = (app: any): void => {
    app.configure(authentication({
        userEndpoint: usersEndpoint
    }));

    app.use(usersEndpoint, baseService('users'));
    app.service(usersEndpoint).before(usersBeforeHooks());

    app.use(postsEndpoint, baseService('posts'));
    app.service(postsEndpoint).before(postsBeforeHooks());

    app.use('/api/headlines', baseService('headlines'));
    app.use('/api/categories', baseService('categories'));
    app.use('/api/options', optionsService);

};
