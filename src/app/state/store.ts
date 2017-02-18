import { createStore, applyMiddleware, compose, Store, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import * as createLogger from 'redux-logger';

// Models
import { IStore } from 'models/store';
import rootReducer from './reducers';

const appConfig = require('../../../config/main');

export function configureStore(history, initialState?: IStore): Store<IStore> {

    const middlewares: Middleware[] = [
        routerMiddleware(history),
        thunk
    ];

    /** Add Only Dev. Middlewares */
    if (appConfig.env !== 'production' && process.env.BROWSER) {
        const logger = createLogger();
        middlewares.push(logger);
    }

    const composeEnhancers = (appConfig.env !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    if (appConfig.env === 'development' && (module as any).hot) {
        (module as any).hot.accept('./reducers', () => {
            store.replaceReducer((require('./reducers')));
        });
    }

    return store;
}
