import { createBaseService } from 'api/base';

const usersServiceName = 'users';
const usersService = (): any => createBaseService({ name: usersServiceName });

export { usersBeforeHooks } from './hooks';
export { usersServiceName, usersService }
