import { crudGenerator } from 'utils';
import { request } from 'services/request';

// Models
import { ICategory } from 'models/content';

const {
    actions,
    reducer: categoriesReducer
} = crudGenerator('categories', { fetch: true });

/* Async action creator */
const getCategories = () => (dispatch) => {
    dispatch(actions.fetchStart());

    return request({
        method: 'categories'
    })
        .then((categories: ICategory[]) => dispatch(actions.fetchSuccess(categories)));
};

export {
    categoriesReducer,
    getCategories
};
