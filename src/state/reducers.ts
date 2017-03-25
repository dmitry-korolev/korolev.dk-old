import { routerReducer } from 'react-router-redux';
import { Reducer, combineReducers } from 'redux';
import { reducer } from 'redux-connect';

// Reducers
import { applicationReducer } from 'state/application';
import { categoriesReducer } from 'state/categories';
import { headlinesReducer } from 'state/headlines';
import { postsReducer } from 'state/posts';
import { userReducer } from 'state/user';

// Types
import { IStore } from 'models/store';

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
    application: applicationReducer,
    categories: categoriesReducer,
    headlines: headlinesReducer,
    posts: postsReducer,
    user: userReducer,
    routing: routerReducer,
    reduxAsyncConnect: reducer
});

export default rootReducer;
