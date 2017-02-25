import { request } from 'services/request';
import { crudGenerator } from 'utils';

// Models
import { ICategory } from 'models/content';
import { IFluxActionCreator } from 'models/flux';
import { IGetState } from 'models/store';
import { Dispatch } from 'redux';

const {
    actions,
    reducer: categoriesReducer
} = crudGenerator('categories', { fetch: true });

type IGetCategoriesActionCreator = (dispatch: Dispatch<any>, getState: IGetState) => Promise<any>;

/* Async action creator */
const getCategories: IFluxActionCreator = (): IGetCategoriesActionCreator =>
    (dispatch: Dispatch<any>, getState: IGetState): Promise<any> => {
        const state = getState();

        dispatch(actions.fetchStart());

        return request({
            method: 'categories'
        }, state)
            .then((categories: ICategory[]) => dispatch(actions.fetchSuccess(categories)))
            .catch((error: Error) => dispatch(actions.fetchError(error)));
    };

getCategories.onlyServer = true;

export {
    categoriesReducer,
    getCategories
};
