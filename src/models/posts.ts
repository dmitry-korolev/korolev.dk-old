import { ICommonReducerState } from 'models/flux'

export interface IPost {
  _created: string
  _id: string
  _updated?: string
  author: string
  content: string
  excerpt?: string
  format: 'standard'
  status: 'draft' | 'publish'
  sticky: boolean
  subtitle?: string
  tags?: number[]
  title?: string
  type: 'page' | 'post'
}

export type IPosts = ICommonReducerState<IPost>
