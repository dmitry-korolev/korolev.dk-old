import { CRUD } from 'utils';

// Models
import { ICategories, ICategory } from 'models/content';

const {
    asyncActions,
    reducer: categoriesReducer
} = new CRUD<ICategories, ICategory>('categories', { fetch: true });

/* Async action creator */
const getCategories = asyncActions.find;
getCategories.onlyServer = true;

export {
    categoriesReducer,
    getCategories
};
