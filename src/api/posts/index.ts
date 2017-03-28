import { createBaseService } from 'api/base';
import { validatePost } from 'utils/server';

const postsServiceName = 'posts';
const postsService = (): any => createBaseService({
    name: postsServiceName,
    validator: validatePost
});

export {
    postsBeforeHooks
} from './hooks';

export {
    postsService,
    postsServiceName
};
