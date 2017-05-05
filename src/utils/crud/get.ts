import * as debug from 'debug';
import { path } from 'utils/ramda';

// Models
import { IDebugger } from 'debug';
import { ICrudActionCreators, IQuery } from 'models/crud';
import { IAsyncAction, IAsyncActionCreator, ICommonReducerState } from 'models/flux';
import { IGetState, IStore } from 'models/store';
import { Dispatch } from 'redux';
import { Service } from 'feathers';

export const generateGet =
    <IItem>(
        serviceName: string,
        getService: () => Service<IItem>,
        actions: ICrudActionCreators<IItem>
    ): IAsyncActionCreator<IQuery> => {
        const logError: IDebugger = debug(`k:crud:${serviceName}:error`);

        const get: IAsyncActionCreator<string> = (_id: string): IAsyncAction => {
            const service = getService();

            return async (dispatch: Dispatch<ICommonReducerState<IItem>>, getState: IGetState): Promise<void> => {
                const state: IStore = getState();

                if (path([serviceName, 'itemsById', _id], state)) {
                    return;
                }

                await dispatch(actions.fetchStart());

                try {
                    const result: IItem = await service.get(_id);
                    if (!result) {
                        await dispatch(actions.fetchSuccess([]));
                        return;
                    }

                    await dispatch(actions.fetchSuccess([result]));
                } catch (error) {
                    logError('GET', error);
                    await dispatch(actions.fetchError(error));
                }
            };
        };

        get.actionName = `${serviceName}Find`;

        return get;
    };
