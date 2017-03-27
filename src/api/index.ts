import * as authentication from 'feathers-authentication';

import { headlinesBeforeHooks, headlinesService, headlinesServiceName } from 'api/headlines';
import { optionsBeforeHooks, optionsService, optionsServiceName } from 'api/options';
import { postsBeforeHooks, postsService, postsServiceName } from 'api/posts';
import { tagsBeforeHooks, tagsService, tagsServiceName } from 'api/tags';
import { usersBeforeHooks, usersService, usersServiceName } from 'api/users';

const apiEndpoint = (serviceName: string): string => `/api/${serviceName}`;

export const setupApplication = (app: any): void => {
    app.configure(authentication({
        userEndpoint: `/api/${usersServiceName}`
    }));

    app.use(apiEndpoint(usersServiceName), usersService());
    app.service(apiEndpoint(usersServiceName)).before(usersBeforeHooks());

    app.use(apiEndpoint(postsServiceName), postsService());
    app.service(apiEndpoint(postsServiceName)).before(postsBeforeHooks());

    app.use(apiEndpoint(headlinesServiceName), headlinesService());
    app.service(apiEndpoint(headlinesServiceName)).before(headlinesBeforeHooks());

    app.use(apiEndpoint(tagsServiceName), tagsService());
    app.service(apiEndpoint(tagsServiceName)).before(tagsBeforeHooks());

    app.use(apiEndpoint(optionsServiceName), optionsService());
    app.service(apiEndpoint(optionsServiceName)).before(optionsBeforeHooks());
};
