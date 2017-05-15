import { UserRoles } from 'utils/user'

// Models
import { ICommonFetch } from 'models/flux'

export interface IUserData {
  _created?: string
  _id?: string
  _updated?: string
  email?: string
  level: UserRoles
  url?: string
  username?: string
}

export interface IUser extends ICommonFetch {
  isLoggedIn: boolean
  userData: IUserData
}

export interface IUserCredentials {
  email: string
  password: string
}
