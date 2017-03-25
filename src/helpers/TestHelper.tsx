/** React Specific */
import { ReactWrapper, mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// IState
import rootReducer from 'state/reducers';

const fetchMock = require('fetch-mock');

/** Redux Mock Store Configuration */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/** Render Component */
function renderComponent(ComponentClass: any, state?: any, props?: any): ReactWrapper<any, any> {
    const store = createStore(rootReducer, state);

    return mount(
        <Provider store={ store }>
            <ComponentClass { ...props } />
        </Provider>
    );
}

export { mockStore, fetchMock, renderComponent };
