import { tagsService } from './crud';

/* Async action creator */
const getTags = tagsService.find;
getTags.onlyServer = true;

export {
    getTags
};
