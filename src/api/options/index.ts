import { BaseService } from 'api/base'

import { restrictToAdmin } from 'api/hooks'
import { combineHooks } from 'utils'
import { validateOption } from 'utils/server'

import { optionsDb } from './db'
import { optionsServiceName } from './serviceName'

// Models
import { IHooks } from 'models/api'
import { IOption } from 'models/options'

class OptionsService extends BaseService<IOption> {
  public before: IHooks = combineHooks(
    restrictToAdmin()
  )

  public find (params: any): Promise<IOption[]> {
    // Remove internal options from response
    params.query.internal = {
      $ne: true
    }

    return super.find(params)
  }
}

const optionsService = (): any => new OptionsService({
  serviceName: optionsServiceName,
  validator: validateOption,
  Model: optionsDb
})

export {
  optionsService,
  optionsServiceName
}
