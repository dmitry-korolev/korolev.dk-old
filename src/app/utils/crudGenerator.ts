import { createAction, toCamelCase } from 'utils';

import { IFluxAction } from 'models/flux';

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
    fetchStart?: (...payload: any[]) => IFluxAction;
    fetchSuccess?: (...payload: any[]) => IFluxAction;
    fetchError?: (...payload: any[]) => IFluxAction;
}

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

const updateArray = (items, array: any[] = []) => pipe(
    concat(pluck('id', items)),
    uniq,
    sort((a: number, b: number) => a - b)
)(array);

const generator = (type: string) => pipe(
    map((i) => `${type}/${i}`),
    indexBy(identity)
);

const generateTypes = (type: string, options: ICrudOptions) => {
    const typeGen = generator(type);

    return {
        ...(options.fetch ? typeGen(fetchTypes) : {})
    };
};

const generateActions =
    (type: string, types: string[]): ICrudActions =>
        reduce((result, item) => {
            result[toCamelCase(item)] = createAction(`${type}/${item}`);

            return result;
        }, {}, types);

// TODO: Add create, update and delete generators

const generateFetchHandlers = (type: string) => ({
    [`${type}/FETCH_START`]: (state) => ({
        ...state,
        isFetching: true
    }),
    [`${type}/FETCH_SUCCESS`]: (state, action: IFluxAction) => ({
        ...state,
        isFetching: false,
        [type]: updateArray(action.payload, state[type]),
        [`${type}ById`]: {
            ...state[`${type}ById`],
            ...indexBy(prop('id'), action.payload)
        }
    }),
    [`${type}/FETCH_ERROR`]: (state, action: IFluxAction) => ({
        ...state,
        isFetching: false,
        error: action.error
    })
});

const generateReducer = (type: string, options) => {
    const initialState = {
        isFetching: false,
        [type]: [],
        [`${type}ById`]: {}
    };

    const actionHandlers = {
        ...(options.fetch ? generateFetchHandlers(type) : {})
    };

    return (state: any = initialState, action: IFluxAction) => {
        if (actionHandlers[action.type]) {
            return actionHandlers[action.type](state, action);
        }

        return state;
    };
};

export const crudGenerator = (type: string, opts: ICrudOptions = {}) => {
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
