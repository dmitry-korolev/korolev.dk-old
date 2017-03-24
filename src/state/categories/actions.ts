import { asyncActions } from './crud';

/* Async action creator */
const getCategories = asyncActions.find;
getCategories.onlyServer = true;

export {
    getCategories
};
