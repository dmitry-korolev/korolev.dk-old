import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-connect';

// Reducers
import { headlinesReducer } from 'state/headlines';
import { applicationReducer } from 'state/application';
import { postsReducer } from 'state/posts';
import { categoriesReducer } from 'state/categories';

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
