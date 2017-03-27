import { asyncActions } from './crud';

/* Async action creator */
const getTags = asyncActions.find;
getTags.onlyServer = true;

export {
    getTags
};
