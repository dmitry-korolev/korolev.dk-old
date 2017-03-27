import { CRUD } from 'utils';

// Models
import { ITag, ITags } from 'models/content';

const { asyncActions, reducer } = new CRUD<ITags, ITag>('tags', { fetch: true });

export {
    asyncActions,
    reducer
}
