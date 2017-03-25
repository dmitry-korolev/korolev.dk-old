import { UserRoles } from 'utils/user';

// Models
import { ICommonReducer } from 'models/flux';

export interface IUserData {
    level: UserRoles;
    username?: string;
    url?: string;
    email?: string;
    id?: number;
}

export interface IUser extends ICommonReducer, IUserData {
    isLoggedIn: boolean;
}

export interface IUserCredentials {
    email: string;
    password: string;
}
