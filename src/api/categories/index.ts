import { createBaseService } from 'api/base';

const categoriesServiceName = 'categories';
const categoriesService = (): any => createBaseService(categoriesServiceName);

export { categoriesBeforeHooks } from './hooks';
export { categoriesService, categoriesServiceName };
