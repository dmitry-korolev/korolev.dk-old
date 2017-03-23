import { CRUD } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';
import { IAction } from 'models/flux';

const {
    asyncActions,
    reducer
} = new CRUD<IPosts, IPost>('posts', { fetch: true });

const initialState: IPosts = {
    isFetching: false,
    posts: [],
    postsById: {},
    total: 0
};

const POSTS_SET_TOTAL: string = 'posts/POSTS_SET_TOTAL';

/** Reducer */
function postsReducer(state: IPosts = initialState, action: IAction): IPosts {
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
const getPosts = asyncActions.find;
const getPost = asyncActions.get;

export {
    postsReducer,
    getPosts,
    getPost
};
