import { app } from 'services';

import { generateActions } from './actions';
import { generateFind } from './find';
import { generateGet } from './get';
import { generateReducer } from './reducer';
import { generateTypes } from './types';

// Models
import { ICRUD, ICrudActionCreators, ICrudActionTypes, ICrudOptions, IQuery } from 'models/crud';
import { IAsyncActionCreator, ICommonReducerState, IReducer } from 'models/flux';
import { Service } from 'feathers';

export const crud = <IItem>({
    serviceName,
    initialState
}: ICrudOptions<ICommonReducerState<IItem>>): ICRUD<IItem> => {
    const innerInitialState: ICommonReducerState<IItem> = {
        ...initialState,
        isFetching: false,
        error: false,
        itemsById: {}
    };
    const getService = (): Service<IItem> => app.service(`api/${serviceName}`);
    const types: ICrudActionTypes = generateTypes(serviceName);
    const actions: ICrudActionCreators<IItem> = generateActions<IItem>(serviceName);
    const reducer: IReducer<ICommonReducerState<IItem>> = generateReducer<IItem>(types, innerInitialState);
    const find: IAsyncActionCreator<IQuery> = generateFind<IItem>(serviceName, getService, actions);
    const get: IAsyncActionCreator<string> = generateGet<IItem>(serviceName, getService, actions);

    return {
        reducer,
        find,
        get
    };
};
