import {
    indexBy,
    identity,
    map,
    pipe,
    prop,
    toUpper,
    toPairs
} from 'ramda';

interface ICrudOptions {
    fetch?: boolean;
    update?: boolean;
    create?: boolean;
    delete?: boolean;
}

interface ICrudActions {
    fetchStart?: <T>(data?: T) => ({ type: string; data?: T; });
    fetchSuccess?: <R, T>(result: R, data?: T) => ({ type: string; result: R; data?: T; });
    fetchError?: <Error, T>(error: Error, data?: T) => ({ type: string; error: Error; data?: T; });
}

export interface ICrudAction {
    type: string;
    error?: Error;
    result?: any;
    data?: any;
}

const defaultOptions: ICrudOptions = {
    fetch: false,
    update: false,
    create: false,
    delete: false
};

const fetchTypes = ['FETCH_START', 'FETCH_SUCCESS', 'FETCH_ERROR'];
const updateTypes = ['UPDATE_START', 'UPDATE_SUCCESS', 'UPDATE_ERROR'];
const createTypes = ['CREATE_START', 'CREATE_SUCCESS', 'CREATE_ERROR'];
const deleteTypes = ['DELETE_START', 'DELETE_SUCCESS', 'DELETE_ERROR'];

const arrayToHash = (array: any[], by: string) => pipe(
    indexBy(prop(by)),
    toPairs
)(array);
const toMap = (array: any[], by: string = 'id') => new Map(arrayToHash(array, by));

const generator = (type: string) => pipe(
    map((i) => `${type}_${i}`),
    indexBy(identity)
);

const typesGenerator = (type: string, options: ICrudOptions) => {
    const typeGen = generator(type);

    return {
        ...(options.fetch ? typeGen(fetchTypes) : {}),
        ...(options.update ? typeGen(updateTypes) : {}),
        ...(options.create ? typeGen(createTypes) : {}),
        ...(options.delete ? typeGen(deleteTypes) : {})
    };
};

const generateFetchActions = (type: string): ICrudActions => ({
    fetchStart: (data?: any) => ({
        type: `${type}_FETCH_START`,
        data
    }),
    fetchSuccess: (result: any, data?: any) => ({
        type: `${type}_FETCH_SUCCESS`,
        result,
        data
    }),
    fetchError: (error: Error, data?: any) => ({
        type: `${type}_FETCH_ERROR`,
        error,
        data
    })
});

// TODO: Add create, update and delete generators

const generateFetchHandlers = (type: string) => ({
    [`${type}_FETCH_START`]: (state) => ({
        ...state,
        isFetching: true
    }),
    [`${type}_FETCH_SUCCESS`]: (state, action: ICrudAction) => ({
        ...state,
        isFetching: false,
        [type]: new Map([...state[type], ...toMap(action.result)])
    }),
    [`${type}_FETCH_ERROR`]: (state, action: ICrudAction) => ({
        ...state,
        isFetching: false,
        error: action.error
    })
});

const generateReducer = (type: string, options) => {
    const initialState = {
        isFetching: false,
        [type]: new Map()
    };

    const actionHandlers = {
        ...(options.fetch ? generateFetchHandlers(type) : {})
    };

    return (state: any = initialState, action: ICrudAction) => {
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
    const typeUpper = toUpper(type);
    const types = typesGenerator(typeUpper, options);
    const actions: ICrudActions = {
        ...(options.fetch ? generateFetchActions(typeUpper) : {})
    };
    const reducer = generateReducer(typeUpper, options);

    return {
        types,
        actions,
        reducer
    };
};
