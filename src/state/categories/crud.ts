import { CRUD } from 'utils';

// Models
import { ICategories, ICategory } from 'models/content';

const { asyncActions, reducer } = new CRUD<ICategories, ICategory>('categories', { fetch: true });

export {
    asyncActions,
    reducer
}
