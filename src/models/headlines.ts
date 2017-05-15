import { ICommonReducerState } from 'models/flux'

export interface IHeadline {
  _created?: string
  _id?: string
  _updated?: string
  content: string
}

export interface IHeadlines extends ICommonReducerState<IHeadline> {
  current?: IHeadline
}
