import { asyncActions } from './crud';
import { HEADLINES_SET } from './types';

// Models
import { IAction } from 'models/flux';

const getHeadlines = asyncActions.find;
getHeadlines.onlyServer = true;

/* Action creators */
const headlinesSet = (): IAction => ({
    type: HEADLINES_SET
});

export {
    getHeadlines,
    headlinesSet
}
