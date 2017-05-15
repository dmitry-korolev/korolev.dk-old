export interface IPaginatedResult<IItem> {
  total: number
  limit: number
  skip: number
  data: IItem[]
}

export interface IPaginationOptions {
  default: number
  max?: number
}

export interface IPaginationUpdateOptions {
  itemsList: string[]
  key: string
  pageNumber: number
  totalPages: number
}

export interface IPaginationQuery {
  pageNumber: number
  key: string
}

export interface IPaginationReducerState {
  [K: string]: {
    total: number;
    [K: number]: string[]
  }
}
