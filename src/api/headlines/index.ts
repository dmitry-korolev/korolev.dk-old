import { createBaseService } from 'api/base';

const headlinesServiceName = 'headlines';
const headlinesService = (): any => createBaseService({ name: headlinesServiceName });

export { headlinesBeforeHooks } from './hooks';
export { headlinesService, headlinesServiceName };
