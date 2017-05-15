import * as debug from 'debug'

// Utils
import { paginationUpdate } from 'state/pagination'
import { mapItemsToIds } from 'utils'
import { path } from 'utils/ramda'

// Models
import { IDebugger } from 'debug'
import { ICrudActionCreators, IFindOptions, IQuery } from 'models/crud'
import { IAsyncAction, IAsyncActionCreator, ICommonReducerState } from 'models/flux'
import { IGetState } from 'models/store'
import { Dispatch } from 'redux'
import { Pagination, Service } from 'feathers'

const isPaginated = <T> (pet: T | T[] | Pagination<T>): pet is Pagination<T> => {
  return (pet as Pagination<T>).data !== undefined // tslint:disable-line strict-type-predicates
}

const toArray = <T> (source: T | T[]): T[] => Array.isArray(source) ? source : [source]

export const generateFind =
  <IItem> (serviceName: string,
           getService: () => Service<IItem>,
           actions: ICrudActionCreators<IItem>): IAsyncActionCreator<IQuery> => {
    const logError: IDebugger = debug(`k:crud:${serviceName}:error`)

    const find: IAsyncActionCreator<IFindOptions> =
      ({ query = {}, pagination }: IFindOptions = {}): IAsyncAction => {
        const service = getService()

        return async (dispatch: Dispatch<ICommonReducerState<IItem>>, getState: IGetState): Promise<void> => {
          if (pagination) {
            if (path(['pagination', pagination.key, pagination.pageNumber], getState())) {
              return
            }

            query.pageNumber = pagination.pageNumber
          }

          if (path([serviceName, 'itemsById', 'length'], getState())) {
            return
          }

          await dispatch(actions.fetchStart())

          try {
            const result = await service.find({ query })
            const items = isPaginated(result) ? result.data : result

            await dispatch(actions.fetchSuccess(toArray(items)))

            if (pagination) {
              const { key, pageNumber } = pagination
              const { total, limit } = result as Pagination<IItem>
              const totalPages = Math.ceil(+total / +limit)

              await dispatch(paginationUpdate({
                key,
                totalPages,
                itemsList: mapItemsToIds(items),
                pageNumber
              }))
            }
          } catch (error) {
            logError('FIND', error)
            await dispatch(actions.fetchError(error))
          }
        }
      }

    find.actionName = `${serviceName}Find`

    return find
  }
