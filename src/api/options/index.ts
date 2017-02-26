import { BaseService } from 'api/base';
import * as NeDB from 'nedb';

// Models
import { IJSONData } from 'models/api';

const optionsDb = new NeDB({
    filename: `db/${process.env === 'production' ? 'prod' : 'dev'}/options`,
    autoload: true
});

class OptionsService extends BaseService {
    constructor(options: any) {
        super(options);
    }

    public find(params: any): Promise<IJSONData[]> {
        // Remove internal options from response
        params.query.internal = {
            $ne: true
        };

        return super.find(params);
    }

    public create(data: any, params: any): Promise<IJSONData> {
        if (!data.id) {
            throw new Error('ID parameter is mandatory!');
        }

        data._id = data.id;

        return super.create(data, params);
    }
}

const optionsService = new OptionsService({
    serviceName: 'options',
    Model: optionsDb
});

export {
    optionsDb,
    optionsService
};
