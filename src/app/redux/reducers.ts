import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { headlinesReducer } from './modules/headlines';
import { IStore } from './IStore';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
    routing: routerReducer,
    headlines: headlinesReducer,
    reduxAsyncConnect: reducer
});

export default rootReducer;
