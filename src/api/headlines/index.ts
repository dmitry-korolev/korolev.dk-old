import { BaseService } from 'api/base';
import * as NeDB from 'nedb';

import { restrictToAdmin } from 'api/hooks';
import { combineHooks } from 'utils';
import { validateHeadline } from 'utils/server';

// Models
import { IHooks } from 'models/api';
import { IHeadline } from 'models/headlines';

const headlinesServiceName = 'headlines';

const db = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${headlinesServiceName}`,
    autoload: true
});

class HeadlinesService extends BaseService<IHeadline> {
    public before: IHooks = combineHooks(
        restrictToAdmin()
    );
}

const headlinesService = (): any => new HeadlinesService({
    serviceName: headlinesServiceName,
    validator: validateHeadline,
    Model: db
});

export { headlinesService, headlinesServiceName };
