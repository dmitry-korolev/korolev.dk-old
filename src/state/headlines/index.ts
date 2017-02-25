import { apiRequest } from 'services';
import { crudGenerator, randomFromArray } from 'utils';

// Models
import { IFluxAction, IFluxActionCreator } from 'models/flux';
import { IHeadline, IHeadlines } from 'models/headlines';
import { IGetState } from 'models/store';
import { Dispatch } from 'redux';

const {
    actions,
    reducer
} = crudGenerator('headlines', { fetch: true });
const HEADLINES_SET: string = 'headlines/SET';

/** Initial State */
const initialState: IHeadlines = {
    isFetching: false,
    headlines: [],
    headlinesById: {},
    current: { content: 'На последнем издыхании я проклинаю нелетающих тварей, называющих себя пингвинами!' }
};

/** Reducer */
function headlinesReducer(state: IHeadlines = initialState, action: IFluxAction): IHeadlines {
    switch (action.type) {
        case HEADLINES_SET:
            return {
                ...state,
                current: state.headlinesById[randomFromArray(state.headlines)]
            };

        default:
            return reducer(state, action);
    }
}

type IGetHeadlinesActionCreator = (dispatch: Dispatch<any>, getState: IGetState) => Promise<any>;

/* Async action creator */
const getHeadlines: IFluxActionCreator =
    (): IGetHeadlinesActionCreator => (dispatch: Dispatch<any>, getState: IGetState): Promise<any> => {
        const state = getState();

        if (state.headlines.headlines.length) {
            return Promise.resolve();
        }

        dispatch(actions.fetchStart());

        return apiRequest({
            method: 'headlines'
        }, state)
            .then((headlines: IHeadline[]) => dispatch(actions.fetchSuccess(headlines)))
            .then(() => dispatch(headlinesSet()));
    };

getHeadlines.onlyServer = true;

/* Action creators */
const headlinesSet = (): IFluxAction => ({
    type: HEADLINES_SET
});

export {
    headlinesReducer,
    getHeadlines,
    headlinesSet
}
