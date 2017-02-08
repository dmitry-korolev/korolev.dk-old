import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-connect';

// Reducers
import { headlinesReducer } from 'modules/headlines';
import { applicationReducer } from 'modules/application';
import { postsReducer } from 'modules/posts';
import { categoriesReducer } from 'modules/categories';

// Types
import { IStore } from 'models/store';

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
    headlines: headlinesReducer,
    application: applicationReducer,
    posts: postsReducer,
    categories: categoriesReducer,
    routing: routerReducer,
    reduxAsyncConnect: reducer
});

export default rootReducer;
