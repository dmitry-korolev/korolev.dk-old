import { CRUD } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';

const {
    asyncActions,
    reducer
} = new CRUD<IPosts, IPost>('posts', { fetch: true });

export {
    asyncActions,
    reducer
};
