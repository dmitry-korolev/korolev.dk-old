import { IHeadlinesAction } from 'models/headlines';
import { GET_REQUEST, GET_SUCCESS, GET_FAILURE, SET_HEADLINE } from './types';

/** Async Action Creator */
export const getHeadlines = () => (dispatch, getState) => {
    if (getState().headlines.headlines.length) {
        return Promise.resolve();
    }

    dispatch(headlinesRequest());

    return Promise.resolve(require('../../../../../mocks/taglines.json'))
        .then((taglines: string[]) => dispatch(headlinesSuccess(taglines)))
        .then(() => dispatch(headlinesSet()));
};

/** Action Creators */
export const headlinesRequest = (): IHeadlinesAction => ({
    type: GET_REQUEST
});

export const headlinesSuccess = (headlines: string[]): IHeadlinesAction => ({
    type: GET_SUCCESS,
    payload: {
        headlines
    }
});

export const headlinesFailure = (message: any): IHeadlinesAction => ({
    type: GET_FAILURE,
    payload: {
        message
    }
});

export const headlinesSet = (): IHeadlinesAction => ({
    type: SET_HEADLINE
});
