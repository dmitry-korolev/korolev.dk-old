import * as debug from 'debug';
import { request } from 'services/request';
import { crudGenerator } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';
import { IFluxAction } from 'models/flux';
import { IGetState } from 'models/store';
import { Dispatch } from 'redux';

const {
    actions,
    reducer
} = crudGenerator('posts', { fetch: true });
const log = debug('k:posts');
// const through = (fn: Function): any => (args: any): any => {
//     fn(args);
//     return args;
// };

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

/* Async action creators */
type IGetPostsActionCreator = (dispatch: Dispatch<any>, getState: IGetState) => Promise<any>;
const getPosts = (): IGetPostsActionCreator => (dispatch: Dispatch<any>, getState: IGetState): Promise<any> => {
    const state = getState();

    if (state.posts.posts.length) {
        return Promise.resolve();
    }

    dispatch(actions.fetchStart());

    return request({
        method: 'posts'
    }, state)
        .then((posts: IPost[]) => Promise.all([
            dispatch(actions.fetchSuccess(posts)),
            dispatch(setTotal(posts.length))
        ]));
};

type IGetPostActionCreator = (dispatch: Dispatch<any>, getState: IGetState) => Promise<any>;
const getPost = (id: number): IGetPostActionCreator => (dispatch: Dispatch<any>, getState: IGetState): Promise<any> => {
    log('Get post', id);

    const state = getState();

    if (state.posts.postsById[id]) {
        return Promise.resolve();
    }

    dispatch(actions.fetchStart());

    return request({
        method: `posts/${id}`
    }, state)
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
