import * as NeDB from 'nedb';
import { slugify } from 'transliteration';

import { BaseService } from 'api/base';
import { associateUser, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { validatePost } from 'utils/server';

import { IHooks, IJSONData } from 'models/api';
import { IPost } from 'models/content';

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

    public create(data: IPost, params: any): Promise<IJSONData> {
        if (!data.format) {
            data.format = 'standard';
        }

        if (!data.slug) {
            data.slug = data.title ? slugify(data.title) : slugify(data.content.slice(0, 30));
        }

        if (!data.status) {
            data.status = 'publish';
        }

        if (!data.tags) {
            data.tags = [];
        }

        if (!data.type) {
            data.type = 'post';
        }

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