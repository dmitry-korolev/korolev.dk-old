import {
  handleFetchError,
  handleFetchStart,
  handleFetchSuccess
} from './handlers'

// Models
import { ICrudActionTypes } from 'models/crud'
import { IAction, ICommonReducerState, IReducer } from 'models/flux'

export const generateReducer =
  <IItem> (types: ICrudActionTypes, initialState: ICommonReducerState<IItem>): IReducer<ICommonReducerState<IItem>> =>
    (state: ICommonReducerState<IItem> = initialState, action: IAction): ICommonReducerState<IItem> => {
      const handlers = {
        [types.fetchStart]: handleFetchStart,
        [types.fetchSuccess]: handleFetchSuccess,
        [types.fetchError]: handleFetchError
      }

      if (handlers[action.type]) {
        return handlers[action.type]<IItem>(state, action)
      } else {
        return state
      }
    }
