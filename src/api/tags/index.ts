import * as NeDB from 'nedb';
import { slugify } from 'transliteration';

import { BaseService } from 'api/base';
import { associateUser, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { validateTag } from 'utils/server';

import { IHooks, IJSONData } from 'models/api';
import { ITag } from 'models/content';

const tagsServiceName = 'tags';
const db = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${tagsServiceName}`,
    autoload: true
});

class TagsService extends BaseService {
    public before: IHooks = combineHooks(
        restrictToAdmin(),
        associateUser()
    );

    public create(data: ITag, params: any): Promise<IJSONData> {
        if (!data.slug) {
            data.slug = slugify(data.title);
        }

        return super.create(data, params);
    }
}

const tagsService = (): any => new TagsService({
    serviceName: tagsServiceName,
    validator: validateTag,
    Model: db
});

export {
    tagsService,
    tagsServiceName
};
