import { ICommonReducerState } from 'models/flux'

export interface ITag {
  _count: number
  _created: string
  _id: string
  _updated?: string
  author: string
  description?: string
  taxonomy: 'categories' | 'tags'
  title: string
}

export type ITags = ICommonReducerState<ITag>
