import * as NeDB from 'nedb'

import { BaseService } from 'api/base'
import { associateUser, createSlug, restrictToAdmin } from 'api/hooks'
import { combineHooks } from 'utils'
import { dbPath, validatePage } from 'utils/server'

import { IHooks } from 'models/api'
import { IPage } from 'models/pages'

const pagesServiceName = 'pages'
const db = new NeDB({
  filename: dbPath(pagesServiceName),
  autoload: true
})

class PagesService extends BaseService<IPage> {
  public before: IHooks = combineHooks(
    {
      create: [createSlug]
    },
    restrictToAdmin(),
    associateUser()
  )

  public create (data: IPage, params: any): Promise<IPage> {
    if (!data.status) {
      data.status = 'publish'
    }

    return super.create(data, params)
  }
}

const pagesService = (): any => new PagesService({
  serviceName: pagesServiceName,
  validator: validatePage,
  Model: db
})

export {
  pagesService,
  pagesServiceName
}
