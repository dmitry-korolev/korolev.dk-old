import { path } from 'ramda';

import { crudGenerator } from 'utils';
import { request } from 'services/request';

// Models
import { ICategory } from 'models/content';
import { IGetState } from 'models/store';

const {
    actions,
    reducer: categoriesReducer
} = crudGenerator('categories', { fetch: true });

/* Async action creator */
const getCategories = () => (dispatch, getState: IGetState) => {
    if (path(['categories', 'categories', 'length'], getState())) {
        return Promise.resolve();
    }

    dispatch(actions.fetchStart());

    return request({
        method: 'categories'
    })
        .then((categories: ICategory[]) => dispatch(actions.fetchSuccess(categories)))
        .catch((error) => dispatch(actions.fetchError(error)));
};

export {
    categoriesReducer,
    getCategories
};
