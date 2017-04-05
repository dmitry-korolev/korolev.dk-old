import * as NeDB from 'nedb';

import { BaseService } from 'api/base';
import { associateUser, createSlug, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { calcPage, validatePost } from 'utils/server';

import { IHooks } from 'models/api';
import { IPost } from 'models/content';

const postsServiceName = 'posts';
const db = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${postsServiceName}`,
    autoload: true
});

class PostsService extends BaseService<IPost> {
    public before: IHooks = combineHooks(
        {
            create: [createSlug],
            find: [
                (hook: any): void => {
                    console.log(hook.params);

                    if (!hook.params.query || !hook.params.query.page) {
                        return;
                    }

                    const page = hook.params.query.page;
                    delete hook.params.query.page;

                    hook.params.query = {
                        ...hook.params.query,
                        ...calcPage(10, page)
                    };

                    console.log(hook.params.query);
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
    paginate: {
        default: 10
    },
    Model: db
});

export {
    postsService,
    postsServiceName
};
