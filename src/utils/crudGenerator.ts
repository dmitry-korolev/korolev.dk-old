import * as debug from 'debug';
import { app } from 'services';
import { createAction, toCamelCase } from 'utils';

const descend = require('ramda/src/descend');
const forEach = require('ramda/src/forEach');
const indexBy = require('ramda/src/indexBy');
const map = require('ramda/src/map');
const pipe = require('ramda/src/pipe');
const prop = require('ramda/src/prop');
const sort = require('ramda/src/sort');
const values = require('ramda/src/values');
const zipObj = require('ramda/src/zipObj');

// Models
import IDebugger = debug.IDebugger;
import { IAction, IActionCreator, IAsyncAction, IAsyncActionCreator } from 'models/flux';
import { IGetState, IStore } from 'models/store';
import { Dispatch } from 'redux';

interface ICrudOptions<IState> {
    serviceName: string;
    initialState?: IState;
}

interface ICrudActionCreators<IItem> {
    fetchStart: IActionCreator<void>;
    fetchSuccess: IActionCreator<IItem[]>;
    fetchError: IActionCreator<Error>;
}

interface ICrudActionTypes {
    fetchStart: string;
    fetchSuccess: string;
    fetchError: string;
}

interface IQuery {
    query: any;
}

const fetchTypes = ['FETCH_START', 'FETCH_SUCCESS', 'FETCH_ERROR'];
const updateTypes = ['UPDATE_START', 'UPDATE_SUCCESS', 'UPDATE_ERROR'];
const createTypes = ['CREATE_START', 'CREATE_SUCCESS', 'CREATE_ERROR'];
const deleteTypes = ['DELETE_START', 'DELETE_SUCCESS', 'DELETE_ERROR'];
const allTypes = [
    ...fetchTypes,
    ...updateTypes,
    ...createTypes,
    ...deleteTypes
];

const generateTypesAndActions = <IItem>(serviceName: string): {
    types: ICrudActionTypes,
    actions: ICrudActionCreators<IItem>
} => {
    const tKeys = [];
    const tValues = [];
    const tActions = [];

    forEach((type: string): void => {
        tKeys.push(toCamelCase(type));
        tValues.push(`${serviceName}/${type}`);
        tActions.push(createAction(`${serviceName}/${type}`));
    }, allTypes);

    return {
        types: zipObj(tKeys, tValues),
        actions: zipObj(tKeys, tActions)
    };
};

// TODO: Should fix this hack, when TS 2.3 is on stage.
const updateState = (state: any, newState: any): any => Object.assign({}, state, newState);

const makeSortedArray = pipe(
    values,
    sort(descend(pipe(
        prop('_created'),
        Date.parse
    ))),
    map(prop('_id'))
);

export class CRUD<IState, IItem> {
    private serviceName: string;
    private initialState: IState;
    private types: ICrudActionTypes;
    private actions: ICrudActionCreators<IItem>;
    private logInfo: IDebugger;
    private logError: IDebugger;

    public constructor({
        serviceName,
        initialState
    }: ICrudOptions<IState>) {
        this.serviceName = serviceName;
        this.initialState = initialState;
        this.logInfo = debug(`k:crud:${serviceName}:info`);
        this.logError = debug(`k:crud:${serviceName}:error`);

        this.initialState = updateState(initialState, {
            isFetching: false,
            [serviceName]: [],
            [`${serviceName}ById`]: {}
        });

        const { types, actions } = generateTypesAndActions<IItem>(serviceName);

        this.types = types;
        this.actions = actions;

        this.reducer = this.reducer.bind(this);
        this.find = this.find.bind(this);
        this.get = this.get.bind(this);

        this.find.actionName = `${serviceName}Find`;
        this.get.actionName = `${serviceName}Get`;
    }

    public reducer(state: IState = this.initialState, action: IAction): IState {
        const collection = this.serviceName;
        const collectionById = `${this.serviceName}ById`;
        const types = this.types;

        const actionHandlers = {
            [types.fetchStart]: (): IState => Object.assign({}, state, {
                isFetching: true,
                error: false
            }),
            [types.fetchSuccess]: (): IState => {
                const newItemsById = {
                    ...state[collectionById],
                    ...indexBy(prop('_id'), action.payload)
                };

                return Object.assign({}, state, {
                    isFetching: false,
                    error: false,
                    [collection]: makeSortedArray(newItemsById),
                    [collectionById]: newItemsById
                });
            },
            [types.fetchError]: (): IState => Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                errorMessage: action.payload
            })
        };

        if (actionHandlers[action.type]) {
            return actionHandlers[action.type]();
        }

        return state;
    }

    public find: IAsyncActionCreator<IQuery> = (query?: IQuery): IAsyncAction => {
        return async (dispatch: Dispatch<IStore>): Promise<void> => {
            const service = app.service(`api/${this.serviceName}`);

            dispatch(this.actions.fetchStart());

            try {
                const result: IItem[] = await service.find(query);
                await dispatch(this.actions.fetchSuccess(result));
            } catch (error) {
                this.logError(error);
                await dispatch(this.actions.fetchError(error));
            }
        };
    }

    public get: IAsyncActionCreator<number | string> = (_id: number | string): IAsyncAction => {
        return async (dispatch: Dispatch<IStore>, getState: IGetState): Promise<void> => {
            const service = app.service(`api/${this.serviceName}`);
            const state = getState();

            if (state.posts.postsById[_id]) {
                return;
            }

            dispatch(this.actions.fetchStart());

            try {
                const result: IItem = await service.get(String(_id));
                await dispatch(this.actions.fetchSuccess([result]));
            } catch (error) {
                this.logError(error);
                await dispatch(this.actions.fetchError(error));
            }
        };
    }
}
