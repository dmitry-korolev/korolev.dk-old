import * as authentication from 'feathers-authentication'

// Models
import { IHooks } from 'models/api'

export const associateUser = (): IHooks => {
  const commonHooks = [
    authentication.hooks.associateCurrentUser({
      as: 'author'
    })
  ]

  return {
    create: commonHooks,
    update: commonHooks,
    patch: commonHooks
  }
}
