import { randomFromArray } from 'utils/randomFromArray';
import { GET_REQUEST, GET_SUCCESS, GET_FAILURE, SET_HEADLINE } from './types';
import { IHeadlines, IHeadlinesAction } from 'models/headlines';

/** Initial State */
const initialState: IHeadlines = {
    isFetching: false,
    headlines: [],
    current: '...'
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

        case SET_HEADLINE:
            return {
                ...state,
                current: randomFromArray(state.headlines)
            };

        default:
            return state;
    }
}
