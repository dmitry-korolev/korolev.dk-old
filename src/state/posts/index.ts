import { crudGenerator } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';
import { IFluxAction } from 'models/flux';
import { IGetState } from 'models/store';
import { request } from 'services/request';

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
const getPosts = () => (dispatch, getState: IGetState) => {
    if (getState().posts.posts.length) {
        return Promise.resolve();
    }

    dispatch(actions.fetchStart());

    return request({
        method: 'posts'
    })
        .then((posts: IPost[]) => Promise.all([
            dispatch(actions.fetchSuccess(posts)),
            dispatch(setTotal(posts.length))
        ]));
};

const getPost = (id) => (dispatch, getState: IGetState) => {
    if (getState().posts.postsById[id]) {
        return Promise.resolve();
    }

    dispatch(actions.fetchStart());

    return request({
        method: `posts?id=${id}`
    })
        .then((post: IPost) => dispatch(actions.fetchSuccess([post])));
};

const setTotal = (total: number): IFluxAction => ({
    type: POSTS_SET_TOTAL,
    payload: total
});

export {
    postsReducer,
    getPosts,
    getPost
};
