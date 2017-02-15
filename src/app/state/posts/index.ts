import { crudGenerator } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';
import { IFluxAction } from 'models/flux';

const {
    actions,
    reducer
} = crudGenerator('posts', { fetch: true });

const initialState: IPosts = {
    isFetching: false,
    posts: [],
    postsById: {},
    total: 0
};

const POSTS_SET_TOTAL: string = 'posts/POSTS_SET_TOTAL';

/** Reducer */
function postsReducer(state: IPosts = initialState, action: IFluxAction): IPosts {
    switch (action.type) {
        case POSTS_SET_TOTAL:
            return {
                ...state,
                total: action.payload
            };

        default:
            return reducer(state, action);
    }
}

/* Async action creator */
const getPosts = () => (dispatch) => {
    dispatch(actions.fetchStart());

    return Promise.resolve(require('../../../../mocks/posts.json'))
        .then((posts: IPost[]) => Promise.all([
            dispatch(actions.fetchSuccess(posts)),
            dispatch(setTotal(posts.length))
        ]));
};

const setTotal = (total: number): IFluxAction => ({
    type: POSTS_SET_TOTAL,
    payload: total
});

export {
    postsReducer,
    getPosts
};
