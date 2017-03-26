import { BaseService } from 'api/base';
import * as NeDB from 'nedb';

// Models
import { IJSONData } from 'models/api';

const optionsServiceName = 'options';

const optionsDb = new NeDB({
    filename: `db/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${optionsServiceName}`,
    autoload: true
});

class OptionsService extends BaseService {
    public find(params: any): Promise<IJSONData[]> {
        // Remove internal options from response
        params.query.internal = {
            $ne: true
        };

        return super.find(params);
    }

    public create(data: any, params: any): Promise<IJSONData> {
        if (!data._id) {
            throw new Error('ID parameter is mandatory!');
        }

        return super.create(data, params);
    }
}

const optionsService = (): any => new OptionsService({
    serviceName: optionsServiceName,
    Model: optionsDb
});

export {
    optionsBeforeHooks
} from './hooks';

export {
    optionsService,
    optionsServiceName
};
