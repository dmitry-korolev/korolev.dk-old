import * as NeDB from 'nedb';
import { slugify } from 'transliteration';

import { BaseService } from 'api/base';
import { associateUser, restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { validatePage } from 'utils/server';

import { IHooks, IJSONData } from 'models/api';
import { IPage } from 'models/content';

const pagesServiceName = 'pages';
const db = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${pagesServiceName}`,
    autoload: true
});

class PagesService extends BaseService {
    public before: IHooks = combineHooks(
        restrictToAdmin(),
        associateUser()
    );

    public create(data: IPage, params: any): Promise<IJSONData> {
        if (!data.slug) {
            data.slug = data.title ? slugify(data.title) : slugify(data.content.slice(0, 30));
        }

        if (!data.status) {
            data.status = 'publish';
        }

        return super.create(data, params);
    }
}

const pagesService = (): any => new PagesService({
    serviceName: pagesServiceName,
    validator: validatePage,
    Model: db
});

export {
    pagesService,
    pagesServiceName
};
