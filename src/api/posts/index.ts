import { createBaseService } from 'api/base';

const postsServiceName = 'posts';
const postsService = (): any => createBaseService(postsServiceName);

export {
    postsBeforeHooks
} from './hooks';
export {
    postsService,
    postsServiceName
};
