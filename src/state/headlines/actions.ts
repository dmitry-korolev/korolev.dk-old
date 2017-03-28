import { createAction } from 'utils';
import { headlinesService } from './crud';
import { HEADLINES_SET } from './types';

const getHeadlines = headlinesService.find;
getHeadlines.onlyServer = true;

/* Action creators */
const headlinesSet = createAction(HEADLINES_SET);
headlinesSet.actionName = 'headlinesSet';

export {
    getHeadlines,
    headlinesSet
}
