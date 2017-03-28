import { routerReducer } from 'react-router-redux';
import { Reducer, combineReducers } from 'redux';
import { reducer } from 'redux-connect';

// Reducers
import { applicationReducer } from 'state/application';
import { headlinesReducer } from 'state/headlines';
import { postsReducer } from 'state/posts';
import { tagsService } from 'state/tags';
import { userReducer } from 'state/user';

// Types
import { IStore } from 'models/store';

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
    application: applicationReducer,
    headlines: headlinesReducer,
    posts: postsReducer,
    reduxAsyncConnect: reducer,
    routing: routerReducer,
    tags: tagsService.reducer,
    user: userReducer
});

export default rootReducer;
