import { createAction } from 'utils';
import { asyncActions } from './crud';
import { HEADLINES_SET } from './types';

const getHeadlines = asyncActions.find;
getHeadlines.onlyServer = true;

/* Action creators */
const headlinesSet = createAction(HEADLINES_SET);
headlinesSet.actionName = 'headlinesSet';

export {
    getHeadlines,
    headlinesSet
}
