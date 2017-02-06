import { crudGenerator } from 'utils';

// Models
import { IPost } from 'models/content';

const {
    actions,
    reducer: postsReducer
} = crudGenerator('posts', { fetch: true });

/* Async action creator */
const getPosts = () => (dispatch) => {
    dispatch(actions.fetchStart());

    return Promise.resolve(require('../../../../../mocks/posts.json'))
        .then((posts: IPost[]) => dispatch(actions.fetchSuccess(posts)));
};

export {
    postsReducer,
    getPosts
};
