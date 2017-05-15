import { createAction, toCamelCase } from 'utils'
import { forEach, zipObj } from 'utils/ramda'
import { allTypes } from './constants'

import { ICrudActionCreators } from 'models/crud'

export const generateActions = <IItem> (serviceName: string): ICrudActionCreators<IItem> => {
  const tKeys = []
  const tActions = []

  forEach((type: string): void => {
    tKeys.push(toCamelCase(type))
    tActions.push(createAction(`${serviceName}/${type}`))
  }, allTypes)

  return zipObj(tKeys, tActions)
}
