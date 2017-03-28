import * as NeDB from 'nedb';

import { BaseService } from 'api/base';
import { associateUser, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { validatePost } from 'utils/server';

import { IHooks, IJSONData } from 'models/api';

const postsServiceName = 'posts';
const db = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${postsServiceName}`,
    autoload: true
});

class PostsService extends BaseService {
    public before: IHooks = combineHooks(
        restrictToAdmin(),
        associateUser()
    );

    public create(data: any, params: any): Promise<IJSONData> {
        return super.create(data, params);
    }
}

const postsService = (): any => new PostsService({
    serviceName: postsServiceName,
    validator: validatePost,
    Model: db
});

export {
    postsService,
    postsServiceName
};
