import { createBaseService } from 'api/base';

const tagsServiceName = 'tags';
const tagsService = (): any => createBaseService({ name: tagsServiceName });

export { tagsBeforeHooks } from './hooks';
export { tagsService, tagsServiceName };
