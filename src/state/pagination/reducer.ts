import { IAction } from 'models/flux';
import { IPaginationReducerState } from 'models/pagination';
import { PAGINATION_CLEAR, PAGINATION_UPDATE } from './types';

const paginationClear = (): IPaginationReducerState => ({});
const paginationUpdate = (state: IPaginationReducerState, action: IAction): IPaginationReducerState => {
    const { key, total, pageNumber, itemsList } = action.payload;

    return {
        ...state,
        [key]: {
            ...state[key],
            total,
            [pageNumber]: itemsList
        }
    };
};

export const paginationReducer = (state: IPaginationReducerState = {}, action: IAction): IPaginationReducerState => {
    const handlers = {
        [PAGINATION_CLEAR]: paginationClear,
        [PAGINATION_UPDATE]: paginationUpdate
    };

    if (handlers[action.type]) {
        return handlers[action.type](state, action);
    }

    return state;
};
