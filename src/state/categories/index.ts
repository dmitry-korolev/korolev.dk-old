import { path } from 'ramda';

import { request } from 'services/request';
import { crudGenerator } from 'utils';

// Models
import { ICategory } from 'models/content';
import { IGetState } from 'models/store';
import { Dispatch } from 'redux';

const {
    actions,
    reducer: categoriesReducer
} = crudGenerator('categories', { fetch: true });

type IGetCategoriesActionCreator = (dispatch: Dispatch<any>, getState: IGetState) => Promise<any>;

/* Async action creator */
const getCategories = (): IGetCategoriesActionCreator =>
    (dispatch: Dispatch<any>, getState: IGetState): Promise<any> => {
        const state = getState();

        if (path(['categories', 'categories', 'length'], state)) {
            return Promise.resolve();
        }

        dispatch(actions.fetchStart());

        return request({
            method: 'categories'
        }, state)
            .then((categories: ICategory[]) => dispatch(actions.fetchSuccess(categories)))
            .catch((error: Error) => dispatch(actions.fetchError(error)));
    };

export {
    categoriesReducer,
    getCategories
};
