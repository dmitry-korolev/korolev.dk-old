import { routerMiddleware } from 'react-router-redux';
import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux';
import * as createLogger from 'redux-logger';
import thunk from 'redux-thunk';

// Models
import { IStore } from 'models/store';
import rootReducer from './reducers';

const appConfig = require('../../config/main');

export function configureStore(history: History, initialState?: IStore): Store<IStore> {
    const middlewares: Middleware[] = [
        routerMiddleware(history as any),
        thunk
    ];

    /** Add Only Dev. Middlewares */
    if (appConfig.env !== 'production' && process.env.BROWSER) {
        const logger = createLogger({
            collapsed: true,
            duration: true,
            diff: true
        });
        middlewares.push(logger);
    }

    const composeEnhancers = (appConfig.env !== 'production' &&
        typeof window === 'object' &&
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose; // tslint:disable-line no-string-literal

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
