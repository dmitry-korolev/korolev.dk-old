import { crudGenerator } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';
import { ICrudAction } from 'utils/crudGenerator';

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

const SET_TOTAL: string = 'posts/SET_TOTAL';

/** Reducer */
function postsReducer(state: IPosts = initialState, action: ICrudAction): IPosts {
    switch (action.type) {
        case SET_TOTAL:
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

const setTotal = (total: number): ICrudAction => ({
    type: SET_TOTAL,
    payload: total
});

export {
    postsReducer,
    getPosts
};
