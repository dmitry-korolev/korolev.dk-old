import { routerReducer } from 'react-router-redux';
import { Reducer, combineReducers } from 'redux';
import { reducer as reduxConnectReducer } from 'redux-connect';

// Reducers
import { applicationReducer } from 'state/application';
import { headlinesReducer } from 'state/headlines';
import { pagesService } from 'state/pages';
import { postsReducer } from 'state/posts';
import { tagsService } from 'state/tags';
import { userReducer } from 'state/user';

// Types
import { IStore } from 'models/store';

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
    application: applicationReducer,
    headlines: headlinesReducer,
    pages: pagesService.reducer,
    posts: postsReducer,
    tags: tagsService.reducer,
    user: userReducer,

    routing: routerReducer,
    reduxAsyncConnect: reduxConnectReducer
});

export default rootReducer;
