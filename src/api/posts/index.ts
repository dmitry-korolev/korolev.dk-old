import * as NeDB from 'nedb';

import { BaseService } from 'api/base';
import { associateUser, createSlug, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { calcPage, dbPath, validatePost } from 'utils/server';

import { IHooks } from 'models/api';
import { IPost } from 'models/posts';

const postsServiceName = 'posts';
const db = new NeDB({
    filename: dbPath(postsServiceName),
    autoload: true
});

class PostsService extends BaseService<IPost> {
    public before: IHooks = combineHooks(
        {
            create: [createSlug],
            find: [
                (hook: any): void => {
                    if (!hook.params.query || !hook.params.query.pageNumber) {
                        return;
                    }

                    const page = hook.params.query.pageNumber;
                    delete hook.params.query.pageNumber;

                    hook.params.query = {
                        ...hook.params.query,
                        ...calcPage(10, page)
                    };
                }
            ]
        },
        restrictToAdmin(),
        associateUser()
    );

    public create(data: IPost, params: any): Promise<IPost> {
        if (!data.format) {
            data.format = 'standard';
        }

        if (!data.status) {
            data.status = 'publish';
        }

        if (!data.tags) {
            data.tags = [];
        }

        return super.create(data, params);
    }
}

const postsService = (): any => new PostsService({
    serviceName: postsServiceName,
    validator: validatePost,
    incremental: true,
    paginate: {
        default: 10
    },
    Model: db
});

export {
    postsService,
    postsServiceName
};
