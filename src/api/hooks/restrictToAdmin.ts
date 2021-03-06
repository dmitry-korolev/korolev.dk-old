import * as authentication from 'feathers-authentication'

import { usersServiceName } from 'api/users'
import { UserRoles } from 'utils'

// Models
import { IHooks } from 'models/api'

export const restrictToAdmin = (): IHooks => {
  const commonHooks = [
    authentication.hooks.verifyToken(),
    authentication.hooks.populateUser({
      userEndpoint: `/api/${usersServiceName}`
    }),
    authentication.hooks.hashPassword()
  ]
  const createHooks = [
    ...commonHooks,
    authentication.hooks.restrictToRoles({
      roles: [UserRoles.admin],
      fieldName: 'level'
    })
  ]
  const editHooks = [
    ...commonHooks,
    authentication.hooks.restrictToRoles({
      roles: [UserRoles.admin],
      fieldName: 'level',
      ownerField: '_id',
      owner: true
    })
  ]

  return {
    create: createHooks,
    update: editHooks,
    patch: editHooks,
    remove: editHooks
  }
}
