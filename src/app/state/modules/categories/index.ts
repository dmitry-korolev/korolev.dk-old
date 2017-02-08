import { crudGenerator } from 'utils';

// Models
import { ICategory } from 'models/content';

const {
    actions,
    reducer: categoriesReducer
} = crudGenerator('categories', { fetch: true });

/* Async action creator */
const getCategories = () => (dispatch) => {
    dispatch(actions.fetchStart());

    return Promise.resolve(require('../../../../../mocks/categories.json'))
        .then((categories: ICategory[]) => dispatch(actions.fetchSuccess(categories)));
};

export {
    categoriesReducer,
    getCategories
};
