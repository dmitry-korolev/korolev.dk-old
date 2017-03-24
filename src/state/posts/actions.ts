import { asyncActions } from './crud';

/* Async action creators */
const getPosts = asyncActions.find;
const getPost = asyncActions.get;

export {
    getPosts,
    getPost
};
