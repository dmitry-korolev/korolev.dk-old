import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

import { configureStore } from './state/store';
import routes from './routes';

const store = configureStore(
    browserHistory,
    JSON.parse(decodeURIComponent(window.__INITIAL_STATE__))
);
const history = syncHistoryWithStore(browserHistory, store);
const connectedCmp = (props) => <ReduxAsyncConnect { ...props } />;

if (process.env.NODE_ENV !== 'production') {
    window['grid'] = { // tslint:disable-line
        enable() {
            localStorage.setItem('grid_enable', '1');
            document.body.classList.remove('no-grid');
        },
        disable() {
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
    <Provider store={ store } key='provider'>
        <Router
            history={ history }
            render={ connectedCmp }
        >
            { routes }
        </Router>
    </Provider>,
    document.getElementById('app')
);
