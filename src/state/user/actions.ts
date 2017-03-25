import * as debug from 'debug';
import { app } from 'services';
import { createAction } from 'utils';
import { USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS } from './types';

// Models
import { IAsyncAction, IAsyncActionCreator } from 'models/flux';
import { IStore } from 'models/store';
import { IUserCredentials, IUserData } from 'models/user';
import { Dispatch } from 'redux';

const logError = debug('k:auth:error');

const userLoginStart = createAction(USER_LOGIN_START);
const userLoginSuccess = createAction(USER_LOGIN_SUCCESS);
const userLoginError = createAction(USER_LOGIN_FAIL);

interface IAuthResult {
    data: IUserData;
    token: string;
}

export const userLogin: IAsyncActionCreator = (credentials: IUserCredentials): IAsyncAction =>
    async (dispatch: Dispatch<IStore>): Promise<void> => {
        dispatch(userLoginStart());

        try {
            const result: IAuthResult = await app.authenticate({
                type: 'local',
                ...credentials
            });
            await dispatch(userLoginSuccess(result.data));
        } catch (error) {
            logError(error);
            await dispatch(userLoginError(error));
        }
    };

userLogin.onlyClient = true;
userLogin.once = true;
