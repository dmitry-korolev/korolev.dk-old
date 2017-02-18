/** React Specific */
import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// State
import rootReducer from 'state/reducers';

const fetchMock = require('fetch-mock');

/** Redux Mock Store Configuration */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/** Render Component */
function renderComponent(ComponentClass, state?, props?) {
    const store = createStore(rootReducer, state);

    return mount(
        <Provider store={ store }>
            <ComponentClass { ...props } />
        </Provider>
    );
}

export { mockStore, fetchMock, renderComponent };
