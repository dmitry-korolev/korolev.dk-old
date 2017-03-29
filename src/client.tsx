import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as debug from 'debug';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';

import routes from 'routes';
import { configureStore } from 'state/store';

const store = configureStore(
    browserHistory as any,
    window['__INITIAL_STATE__'] // tslint:disable-line no-string-literal
);
const history = syncHistoryWithStore(browserHistory as any, store);
const connectedCmp = (props: any): any => <ReduxAsyncConnect { ...props } />;

if (process.env.NODE_ENV !== 'production') {
    window['debug'] = debug; // tslint:disable-line

    window['grid'] = { // tslint:disable-line
        enable(): void {
            localStorage.setItem('grid_enable', '1');
            document.body.classList.remove('no-grid');
        },
        disable(): void {
            localStorage.removeItem('grid_enable');
            document.body.classList.add('no-grid');
        }
    };

    window.addEventListener('load', () => {
        if (!localStorage.getItem('grid_enable')) {
            document.body.classList.add('no-grid');
        }
    });
}

ReactDOM.render(
    (
        <Provider store={ store } key='provider'>
            <Router
                history={ history as any }
                render={ connectedCmp }
            >
                { routes }
            </Router>
        </Provider>
    ),
    document.getElementById('app')
);
