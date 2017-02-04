import { IHeadlines, IHeadlinesAction } from 'models/headlines';

/** Action Types */
export const GET_REQUEST: string = 'headlines/GET_REQUEST';
export const GET_SUCCESS: string = 'headlines/GET_SUCCESS';
export const GET_FAILURE: string = 'headlines/GET_FAILURE';

/** Initial State */
const initialState: IHeadlines = {
    isFetching: false,
    headlines: []
};

/** Reducer */
export function headlinesReducer(state = initialState, action: IHeadlinesAction) {
    switch (action.type) {
        case GET_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case GET_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isFetching: false
            };

        case GET_FAILURE:
            return {
                ...state,
                ...action.payload,
                isFetching: false,
                error: true
            };

        default:
            return state;
    }
}

/** Async Action Creator */
export function getHeadlines() {
    return (dispatch) => {
        dispatch(headlinesRequest());

        // return fetch('https://api.github.com/repos/barbar/vortigern')
        //     .then((res) => {
        //         if (res.ok) {
        //             return res.json()
        //                 .then((res) => dispatch(headlinesSuccess(res.stargazers_count)));
        //         } else {
        //             return res.json()
        //                 .then((res) => dispatch(headlinesFailure(res)));
        //         }
        //     })
        //     .catch((err) => dispatch(headlinesFailure(err)));

        return Promise.resolve(require('../../../../../mocks/taglines.json'))
            .then((taglines: string[]) => dispatch(headlinesSuccess(taglines)));
    };
}

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
