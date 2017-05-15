import { UserRoles } from 'utils'
import { pick } from 'utils/ramda'
import { USER_LOGIN_ERROR, USER_LOGIN_START, USER_LOGIN_SUCCESS } from './types'

// Models
import { IAction } from 'models/flux'
import { IUser } from 'models/user'

const initialState: IUser = {
  isFetching: false,
  isLoggedIn: false,
  userData: {
    level: UserRoles.anonymous
  }
}

const pickUserdata = pick([
  '_id',
  'email',
  'level',
  'url',
  'username'
])

export const userReducer = (state: IUser = initialState, action: IAction): IUser => {
  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        isFetching: true
      }

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        ...pickUserdata(action.payload)
      }

    case USER_LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        level: UserRoles.anonymous,
        error: true,
        errorMessage: action.payload
      }

    default:
      return state
  }
}
