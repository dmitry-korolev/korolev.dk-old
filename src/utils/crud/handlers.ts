import { indexBy, prop } from 'utils/ramda';

import { IAction, ICommonReducerState } from 'models/flux';

const idP = prop('_id');

const mergeItemsById = (itemsById: any, newItemsList: any[]): any => ({
    ...itemsById,
    ...indexBy(idP, newItemsList)
});

export const handleFetchStart = <IItem>(state: ICommonReducerState<IItem>): ICommonReducerState<IItem> => ({
    ...state,
    isFetching: true,
    error: false
});

export const handleFetchSuccess =
    <IItem>(state: ICommonReducerState<IItem>, action: IAction): ICommonReducerState<IItem> => {
        if (action.payload.length === 0) {
            return {
                ...state,
                isFetching: false,
                error: false
            };
        }

        return {
            ...state,
            isFetching: false,
            error: false,
            itemsById: mergeItemsById(state.itemsById, action.payload)
        };
    };

export const handleFetchError =
    <IItem>(state: ICommonReducerState<IItem>, action: IAction): ICommonReducerState<IItem> => {
        return {
            ...state,
            isFetching: false,
            error: true,
            errorMessage: action.payload
        };
    };
