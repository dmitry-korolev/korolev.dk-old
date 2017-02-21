import { IFluxAction } from 'models/flux';
import { IActionCreator, createAction, toCamelCase } from 'utils';

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

interface ICrudOptions {
    fetch?: boolean;
    update?: boolean;
    create?: boolean;
    delete?: boolean;
}

interface ICrudActions {
    fetchStart?: IActionCreator;
    fetchSuccess?: IActionCreator;
    fetchError?: IActionCreator;
}

type ICrudReducer = (state: any, action?: IFluxAction) => any;

const defaultOptions: ICrudOptions = {
    fetch: false,
    update: false,
    create: false,
    delete: false
};

const fetchTypes = ['FETCH_START', 'FETCH_SUCCESS', 'FETCH_ERROR'];
// const updateTypes = ['UPDATE_START', 'UPDATE_SUCCESS', 'UPDATE_ERROR'];
// const createTypes = ['CREATE_START', 'CREATE_SUCCESS', 'CREATE_ERROR'];
// const deleteTypes = ['DELETE_START', 'DELETE_SUCCESS', 'DELETE_ERROR'];

const updateArray = (items: number[], array: number[] = []): number[] => pipe(
    concat(pluck('id', items)),
    uniq,
    sort((a: number, b: number): number => b - a)
)(array);

const generator = (type: string): (type: string[]) => { [K: string]: string } => pipe(
    map((i: string): string => `${type}/${i}`),
    indexBy(identity)
);

const generateTypes = (type: string, options: ICrudOptions): { [K: string]: string } => {
    const typeGen = generator(type);

    return {
        ...(options.fetch ? typeGen(fetchTypes) : {})
    };
};

const generateActions =
    (type: string, types: string[]): ICrudActions =>
        reduce((result: ICrudActions, item: string): ICrudActions => {
            result[toCamelCase(item)] = createAction(`${type}/${item}`);

            return result;
        }, {}, types);

// TODO: Add create, update and delete generators

const generateFetchHandlers = (type: string): { [K: string]: Function } => ({
    [`${type}/FETCH_START`]: (state: Object): Object => ({
        ...state,
        isFetching: true
    }),
    [`${type}/FETCH_SUCCESS`]: (state: any, action: IFluxAction): any => ({
        ...state,
        isFetching: false,
        [type]: updateArray(action.payload, state[type]),
        [`${type}ById`]: {
            ...state[`${type}ById`],
            ...indexBy(prop('id'), action.payload)
        }
    }),
    [`${type}/FETCH_ERROR`]: (state: any, action: IFluxAction): any => ({
        ...state,
        isFetching: false,
        error: action.error
    })
});

const generateReducer = (type: string, options: ICrudOptions): ICrudReducer => {
    const initialState = {
        isFetching: false,
        [type]: [],
        [`${type}ById`]: {}
    };

    const actionHandlers = {
        ...(options.fetch ? generateFetchHandlers(type) : {})
    };

    return (state: any = initialState, action: IFluxAction): any => {
        if (actionHandlers[action.type]) {
            return actionHandlers[action.type](state, action);
        }

        return state;
    };
};

export const crudGenerator = (type: string, opts: ICrudOptions = {}): {
    types: { [K: string]: string },
    actions: ICrudActions,
    reducer: ICrudReducer
} => {
    const options = {
        ...defaultOptions,
        ...opts
    };
    const types = generateTypes(type, options);
    const actions: ICrudActions = {
        ...(options.fetch ? generateActions(type, fetchTypes) : {})
    };
    const reducer = generateReducer(type, options);

    return {
        types,
        actions,
        reducer
    };
};
