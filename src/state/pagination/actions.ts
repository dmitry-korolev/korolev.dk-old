import { createAction } from 'utils';
import { PAGINATION_CLEAR, PAGINATION_UPDATE } from './types';

// Models
import { IPaginationUpdateOptions } from 'models/pagination';

export const paginationClear = createAction(PAGINATION_CLEAR);
export const paginationUpdate = createAction<IPaginationUpdateOptions>(PAGINATION_UPDATE);
