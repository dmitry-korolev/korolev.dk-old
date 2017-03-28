import { randomFromArray } from 'utils';
import { headlinesService } from './crud';
import { HEADLINES_SET } from './types';

// Models
import { IAction } from 'models/flux';
import { IHeadlines } from 'models/headlines';

/** Initial IState */
const initialState: IHeadlines = {
    isFetching: false,
    headlines: [],
    headlinesById: {},
    current: { content: 'На последнем издыхании я проклинаю нелетающих тварей, называющих себя пингвинами!' }
};

/** Reducer */
function headlinesReducer(state: IHeadlines = initialState, action: IAction): IHeadlines {
    switch (action.type) {
        case HEADLINES_SET:
            return {
                ...state,
                current: state.headlinesById[randomFromArray(state.headlines)]
            };

        default:
            return headlinesService.reducer(state, action);
    }
}

export {
    headlinesReducer
}
