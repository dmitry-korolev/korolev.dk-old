import { randomFromMap } from 'utils/randomFromMap';
import { crudGenerator, ICrudAction } from 'utils/crudGenerator';

// Models
import { IHeadlines } from 'models/headlines';

const {
    actions,
    reducer
} = crudGenerator('headlines', { fetch: true });
const SET_HEADLINE: string = 'headlines/SET_HEADLINE';

/** Initial State */
const initialState: IHeadlines = {
    isFetching: false,
    headlines: new Map(),
    current: { content: '...' }
};

/** Reducer */
export function headlinesReducer(state: IHeadlines = initialState, action: ICrudAction): IHeadlines {
    switch (action.type) {
        case SET_HEADLINE:
            return {
                ...state,
                current: randomFromMap(state.headlines)
            };

        default:
            return reducer(state, action);
    }
}

/* Async action creator */
export const getHeadlines = () => (dispatch, getState) => {
    if (getState().headlines.headlines.size) {
        return Promise.resolve();
    }

    dispatch(actions.fetchStart());

    return Promise.resolve(require('../../../../../mocks/taglines.json'))
        .then((headlines: string[]) => dispatch(actions.fetchSuccess(headlines)))
        .then(() => dispatch(headlinesSet()));
};

/* Action creators */
export const headlinesSet = () => ({
    type: SET_HEADLINE
});
