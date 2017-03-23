import { CRUD, randomFromArray } from 'utils';

// Models
import { IAction } from 'models/flux';
import { IHeadline, IHeadlines } from 'models/headlines';

/** Initial IState */
const initialState: IHeadlines = {
    isFetching: false,
    headlines: [],
    headlinesById: {},
    current: { content: 'На последнем издыхании я проклинаю нелетающих тварей, называющих себя пингвинами!' }
};

const {
    asyncActions,
    reducer
} = new CRUD<IHeadlines, IHeadline>('headlines', {
    fetch: true
});
const HEADLINES_SET: string = 'headlines/SET';

/** Reducer */
function headlinesReducer(state: IHeadlines = initialState, action: IAction): IHeadlines {
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

const getHeadlines = asyncActions.find;
getHeadlines.onlyServer = true;

/* Action creators */
const headlinesSet = (): IAction => ({
    type: HEADLINES_SET
});

export {
    headlinesReducer,
    getHeadlines,
    headlinesSet
}
