import { toCamelCase } from 'utils'
import { forEach, zipObj } from 'utils/ramda'
import { allTypes } from './constants'

import { ICrudActionTypes } from 'models/crud'

export const generateTypes = (serviceName: string): ICrudActionTypes => {
  const tKeys = []
  const tValues = []

  forEach((type: string): void => {
    tKeys.push(toCamelCase(type))
    tValues.push(`${serviceName}/${type}`)
  }, allTypes)

  return zipObj(tKeys, tValues)
}
