import { baseService } from './base';
import { optionsService } from './options';

const authentication = require('feathers-authentication');
const hooks = authentication.hooks;

export const setupApplication = (app: any): void => {
    app.use('/api/headlines', baseService('headlines'));
    app.use('/api/users', baseService('users'));
    app.use('/api/posts', baseService('posts'));
    app.use('/api/categories', baseService('categories'));
    app.use('/api/options', optionsService);

    app.service('/api/users').before({
        create: hooks.hashPassword(),
        update: hooks.hashPassword(),
        patch: hooks.hashPassword()
    });

    app.service('/api/headlines').before({
        all: [
            hooks.populateUser()
        ]
    });

    app.configure(authentication({
        userEndpoint: '/api/users'
    }));
};
