import { postsService } from './crud';
import { POSTS_SET_TOTAL } from './types';

// Models
import { IPosts } from 'models/content';
import { IAction } from 'models/flux';

const initialState: IPosts = {
    isFetching: false,
    posts: [],
    postsById: {},
    total: 0
};

/** Reducer */
function postsReducer(state: IPosts = initialState, action: IAction): IPosts {
    switch (action.type) {
        case POSTS_SET_TOTAL:
            return {
                ...state,
                total: action.payload
            };

        default:
            return postsService.reducer(state, action);
    }
}

export {
    postsReducer
};
