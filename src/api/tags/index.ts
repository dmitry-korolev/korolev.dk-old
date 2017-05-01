import * as NeDB from 'nedb';

import { BaseService } from 'api/base';
import { associateUser, createSlug, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { dbPath, validateTag } from 'utils/server';

import { IHooks } from 'models/api';
import { ITag } from 'models/tags';

const tagsServiceName = 'tags';
const db = new NeDB({
    filename: dbPath(tagsServiceName),
    autoload: true
});

class TagsService extends BaseService<ITag> {
    public before: IHooks = combineHooks(
        {
            create: [createSlug]
        },
        restrictToAdmin(),
        associateUser()
    );
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
