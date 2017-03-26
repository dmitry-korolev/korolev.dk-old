import * as authentication from 'feathers-authentication';
import { UserRoles } from 'utils';
import { usersEndpoint } from './endpoint';

const usersBeforeHooks = (): any => {
    const commonHooks = [
        authentication.hooks.verifyToken(),
        authentication.hooks.populateUser({
            userEndpoint: usersEndpoint
        }),
        authentication.hooks.hashPassword()
    ];
    const createHooks = [
        ...commonHooks,
        authentication.hooks.restrictToRoles({
            roles: [UserRoles.admin],
            fieldName: 'level'
        })
    ];
    const editHooks = [
        ...commonHooks,
        authentication.hooks.restrictToRoles({
            roles: [UserRoles.admin],
            fieldName: 'level',
            ownerField: '_id',
            owner: true
        })
    ];

    return {
        create: createHooks,
        update: editHooks,
        patch: editHooks,
        remove: editHooks
    };
};

export {
    usersBeforeHooks
}
