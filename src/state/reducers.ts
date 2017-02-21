import { routerReducer } from 'react-router-redux';
import { Reducer, combineReducers } from 'redux';
import { reducer } from 'redux-connect';

// Reducers
import { applicationReducer } from 'state/application';
import { categoriesReducer } from 'state/categories';
import { headlinesReducer } from 'state/headlines';
import { postsReducer } from 'state/posts';

// Types
import { IStore } from 'models/store';

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
    headlines: headlinesReducer,
    application: applicationReducer,
    posts: postsReducer,
    categories: categoriesReducer,
    routing: routerReducer,
    reduxAsyncConnect: reducer
});

export default rootReducer;
