import { IActionCreator, IAsyncActionCreator, ICommonReducerState, IReducer } from 'models/flux'
import { IPaginationQuery } from 'models/pagination'

export interface ICrudActionTypes {
  fetchStart: string
  fetchSuccess: string
  fetchError: string
}

export interface ICrudActionCreators<IItem> {
  fetchStart: IActionCreator<void>
  fetchSuccess: IActionCreator<IItem[]>
  fetchError: IActionCreator<Error>
}

interface IOperators {
  $lt?: number
  $lte?: number
  $gt?: number
  $gte?: number
  $in?: Array<string | number>
  $nin?: Array<string | number>
  $ne?: string | number
  $exists?: boolean
  $size?: number
  $elemMatch?: string
  $or?: IOperators
  $and?: IOperators
  $not?: IOperators
}

export interface IQuery {
  tags?: IOperators
  pageNumber?: number
}

export interface ICrudOptions<IReducerState> {
  serviceName: string
  initialState?: IReducerState
}

export interface ICRUD<IItem> {
  reducer: IReducer<ICommonReducerState<IItem>>
  find: IAsyncActionCreator<IFindOptions>
  get: IAsyncActionCreator<string>
}

export interface IFindOptions {
  query?: IQuery
  pagination?: IPaginationQuery
}
