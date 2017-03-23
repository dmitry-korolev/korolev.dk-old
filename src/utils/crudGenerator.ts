import * as debug from 'debug';
import { app } from 'services';
import { createAction, toCamelCase } from 'utils';

const concat = require('ramda/src/concat');
const identity = require('ramda/src/identity');
const indexBy = require('ramda/src/indexBy');
const map = require('ramda/src/map');
const pipe = require('ramda/src/pipe');
const pluck = require('ramda/src/pluck');
const prop = require('ramda/src/prop');
const reduce = require('ramda/src/reduce');
const sort = require('ramda/src/sort');
const uniq = require('ramda/src/uniq');

// Models
import IDebugger = debug.IDebugger;
import { IAction, IActionCreator, IAsyncAction, IAsyncActionCreator } from 'models/flux';
import { IGetState, IStore } from 'models/store';
import { Dispatch } from 'redux';

interface ICrudOptions<IState> {
    fetch?: boolean;
    update?: boolean;
    create?: boolean;
    delete?: boolean;
    initialState?: IState;
}

interface ICrudActionCreators {
    fetchStart?: IActionCreator;
    fetchSuccess?: IActionCreator;
    fetchError?: IActionCreator;
}

interface IQuery {
    query: any;
}

interface ICrudAsyncActionCreators {
    find?: IAsyncActionCreator;
    get?: IAsyncActionCreator;
}

type ICrudReducer<IState> = (state: IState, action?: IAction) => any;

const fetchTypes = ['FETCH_START', 'FETCH_SUCCESS', 'FETCH_ERROR'];
// const updateTypes = ['UPDATE_START', 'UPDATE_SUCCESS', 'UPDATE_ERROR'];
// const createTypes = ['CREATE_START', 'CREATE_SUCCESS', 'CREATE_ERROR'];
// const deleteTypes = ['DELETE_START', 'DELETE_SUCCESS', 'DELETE_ERROR'];

const updateArray = (items: number[], array: number[] = []): number[] => pipe(
    concat(pluck('id', items)),
    uniq,
    sort((a: number, b: number): number => b - a)
)(array);

const updateState = (state: any, newState: any): any => Object.assign({}, state, newState);

const generator = (type: string): (type: string[]) => { [K: string]: string } => pipe(
    map((i: string): string => `${type}/${i}`),
    indexBy(identity)
);

const generateActions =
    (type: string, types: string[]): ICrudActionCreators =>
        reduce((result: ICrudActionCreators, item: string): ICrudActionCreators => {
            result[toCamelCase(item)] = createAction(`${type}/${item}`);

            return result;
        }, {}, types);

// TODO: Add create, update and delete generators
type IActionHandler<IState> = (state: IState, action?: IAction) => IState;

export class CRUD<IState, IItem> {
    private type: string;
    private options: ICrudOptions<IState>;
    private logInfo: IDebugger;
    private logError: IDebugger;
    private initialState: IState;

    public types: { [K: string]: string };
    public actions: ICrudActionCreators;
    public asyncActions: ICrudAsyncActionCreators;
    public reducer: ICrudReducer<IState>;

    constructor(type: string, {
        initialState,
        ...options
    }: ICrudOptions<IState> = {}) {
        this.type = type;
        this.options = options;
        this.initialState = updateState(initialState, {
            isFetching: false,
            [this.type]: [],
            [`${this.type}ById`]: {}
        });

        this.logInfo = debug(`k:crud:${type}:info`);
        this.logError = debug(`k:crud:${type}:error`);
        this.generateTypes();
        this.generateActions();
        this.generateReducer();
        this.generateAsyncActions();
    }

    private generateTypes(): void {
        const typeGen = generator(this.type);

        this.types = {
            ...(this.options.fetch ? typeGen(fetchTypes) : {})
        };
    }

    private generateActions(): void {
        this.actions = {
            ...(this.options.fetch ? generateActions(this.type, fetchTypes) : {})
        };
    }

    private generateFetchHandlers(type: string): { [K: string]: IActionHandler<IState> } {
        return {
            [`${type}/FETCH_START`]: (state: IState): IState => updateState(state, {
                isFetching: true
            }),
            [`${type}/FETCH_SUCCESS`]: (state: IState, action: IAction): IState => updateState(state, {
                isFetching: false,
                [type]: updateArray(action.payload, state[type]),
                [`${type}ById`]: {
                    ...state[`${type}ById`],
                    ...indexBy(prop('id'), action.payload)
                }
            }),
            [`${type}/FETCH_ERROR`]: (state: IState, action: IAction): IState => updateState(state, {
                isFetching: false,
                error: action.error
            })
        };
    };

    private generateReducer(): void {
        const actionHandlers = {
            ...(this.options.fetch ? this.generateFetchHandlers(this.type) : {})
        };

        this.reducer = (state: IState = this.initialState, action: IAction): IState => {
            if (actionHandlers[action.type]) {
                return actionHandlers[action.type](state, action);
            }

            return state;
        };
    }

    private generateAsyncActions(): void {
        const find: IAsyncActionCreator = (query?: IQuery): IAsyncAction =>
            async (dispatch: Dispatch<IStore>): Promise<any> => {
                const service = app.service(`api/${this.type}`);

                dispatch(this.actions.fetchStart());

                try {
                    const result: IItem[] = await service.find(query);
                    await dispatch(this.actions.fetchSuccess(result));
                } catch (error) {
                    this.logError(error);
                    await dispatch(this.actions.fetchError(error));
                }
            };

        const get: IAsyncActionCreator = (id: number): IAsyncAction =>
            async (dispatch: Dispatch<any>, getState: IGetState): Promise<any> => {
                const service = app.service(`api/${this.type}`);
                const state = getState();

                if (state.posts.postsById[id]) {
                    return;
                }

                dispatch(this.actions.fetchStart());

                try {
                    const result: IItem = await service.get(id);
                    await dispatch(this.actions.fetchSuccess(result));
                } catch (error) {
                    this.logError(error);
                    await dispatch(this.actions.fetchError(error));
                }
            };

        find.actionName = `${this.type}Find`;
        get.actionName = `${this.type}Get`;

        this.asyncActions = {
            find,
            get
        };
    }
}
