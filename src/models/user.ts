import { UserRoles } from 'utils/user';

// Models
import { ICommonReducer } from 'models/flux';

export interface IUserData {
    _id?: string;
    level: UserRoles;
    username?: string;
    url?: string;
    email?: string;
}

export interface IUser extends ICommonReducer, IUserData {
    isLoggedIn: boolean;
}

export interface IUserCredentials {
    email: string;
    password: string;
}
