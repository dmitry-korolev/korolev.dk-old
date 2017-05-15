import { routerReducer } from 'react-router-redux'
import { Reducer, combineReducers } from 'redux'
import { reducer as reduxConnectReducer } from 'redux-connect'

// Reducers
import { applicationReducer } from './application'
import { headlinesReducer } from './headlines'
import { pagesService } from './pages'
import { paginationReducer } from './pagination'
import { postsService } from './posts'
import { tagsService } from './tags'
import { userReducer } from './user'

// Types
import { IStore } from 'models/store'

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  application: applicationReducer,
  headlines: headlinesReducer,
  pages: pagesService.reducer,
  pagination: paginationReducer,
  posts: postsService.reducer,
  tags: tagsService.reducer,
  user: userReducer,

  routing: routerReducer,
  reduxAsyncConnect: reduxConnectReducer
})

export default rootReducer
