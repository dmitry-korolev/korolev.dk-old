import { headlinesService } from './headlines';
import { optionsService } from './options';
import { usersService } from './users';

const authentication = require('feathers-authentication');
const hooks = authentication.hooks;

export const setupApplication = (app: any): void => {
    app.use('/api/headlines', headlinesService);
    app.use('/api/options', optionsService);
    app.use('/api/users', usersService);

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
