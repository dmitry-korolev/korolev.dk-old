import { CRUD } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';

const postsService = new CRUD<IPosts, IPost>({ serviceName: 'posts' });

export {
    postsService
};
