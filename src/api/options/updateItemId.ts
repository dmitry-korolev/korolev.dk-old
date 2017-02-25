import { optionsDb } from './index';

export const updateItemId =
    (type: string): Promise<number> =>
        (new Promise((resolve: Function, reject: Function): void => {
            optionsDb.findOne({ _id: `${type}_last_id` }, (err: Error, lastId: { value: number }) => {
                if (err) {
                    reject(err);
                } else {
                    resolve((lastId || { value: -1 }).value);
                }
            });
        }))
            .then((lastId: number): Promise<number> => new Promise((resolve: Function, reject: Function): void => {
                    const newId = lastId + 1;
                    if (lastId === -1) {
                        optionsDb.insert(
                            {
                                _id: `${type}_last_id`,
                                value: newId,
                                internal: true
                            },
                            (err: Error): void => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(newId);
                                }
                            }
                        );
                    } else {
                        optionsDb.update(
                            {
                                _id: `${type}_last_id`
                            },
                            {
                                value: newId,
                                internal: true
                            },
                            {},
                            (err: Error) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(newId);
                                }
                            }
                        );
                    }
                })
            );
