import { CRUD } from 'utils';

// Models
import { IPost, IPosts } from 'models/content';

const postsService = new CRUD<IPosts, IPost>({
    incremental: true,
    serviceName: 'posts'
});

export {
    postsService
};
