import * as debug from 'debug';
import { Service } from 'feathers-nedb';
import * as NeDB from 'nedb';

const createService = (serviceName: string): any => {
    const logInfo = debug(`k:db:${serviceName}`);
    const db = new NeDB({
        filename: `db/${process.env === 'production' ? '' : 'dev/'}${serviceName}`,
        autoload: true
    });

    db.ensureIndex({
        fieldName: 'id',
        unique: true,
        sparse: true
    });

    class CommonService extends Service {
        constructor(args: any) {
            super(args);
        };

        public find(params?: any): any {
            // Add default sorting
            if (!params.query.$sort) {
                params.query.$sort = {
                    id: -1
                };
            }

            logInfo('FIND', params);

            return super.find(params);
        }

        public get(id: any, params: any): any {
            logInfo('GET', id, params);

            return super.get(id, params);
        }

        public create(data: any, params: any): any {
            data.created = new Date();

            // Get the highest id in database
            return this.find({
                query: {
                    $limit: 1
                }
            })
                .then((results: any[]): any => {
                    let lastId = 0;

                    if (results.length) {
                        lastId = results[0].id || 0;
                    }

                    data.id = lastId + 1;
                    data._id = String(data.id); // For querying
                    logInfo('POST', data, params);

                    return super.create(data, params);
                });
        }

        public update(id: number, data: any, params: any): any {
            data.updated = new Date();
            logInfo('PUT', id, data, params);

            return super.update(id, data, params);
        }

        public patch(id: any, data: any, params: any): any {
            logInfo('PATCH', id, data, params);

            return super.patch(id, data, params);
        }

        public remove(id: any, params: any): any {
            logInfo('DELETE', id, params);

            return super.remove(id, params);
        }
    }

    return {
        db,
        service: new CommonService({
            Model: db
        })
    };
};

export {
    createService
};
