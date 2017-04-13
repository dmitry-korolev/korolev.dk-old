import * as debug from 'debug';

// Utils
import { paginationUpdate } from 'state/pagination';
import { mapItemsToIds } from 'utils';
import { path } from 'utils/ramda';

// Models
import { IDebugger } from 'debug';
import { ICrudActionCreators, IFindOptions, IQuery } from 'models/crud';
import { IAsyncAction, IAsyncActionCreator, ICommonReducerState } from 'models/flux';
import { IGetState } from 'models/store';
import { Dispatch } from 'redux';

export const generateFind =
    <IItem>(serviceName: string, app: any, actions: ICrudActionCreators<IItem>): IAsyncActionCreator<IQuery> => {
        const logError: IDebugger = debug(`k:crud:${serviceName}:error`);

        const find: IAsyncActionCreator<IFindOptions> =
            ({ query = {}, pagination }: IFindOptions = {}): IAsyncAction => {
                const service = app.service(`api/${serviceName}`);

                return async (dispatch: Dispatch<ICommonReducerState<IItem>>, getState: IGetState): Promise<void> => {
                    if (pagination) {
                        if (path(['pagination', pagination.key, pagination.pageNumber], getState())) {
                            return;
                        }
                    }

                    await dispatch(actions.fetchStart());

                    try {
                        const result = await service.find({ query });
                        const items = pagination ? result.data : result;

                        await dispatch(actions.fetchSuccess(items));

                        if (pagination) {
                            const { key, pageNumber } = pagination;
                            const { total } = result;

                            await dispatch(paginationUpdate({
                                key,
                                total,
                                itemsList: mapItemsToIds(items),
                                pageNumber
                            }));
                        }
                    } catch (error) {
                        logError('FIND', error);
                        await dispatch(actions.fetchError(error));
                    }
                };
            };

        find.actionName = `${serviceName}Find`;

        return find;
    };
