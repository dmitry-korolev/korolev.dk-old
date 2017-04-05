import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { App } from './index';

import * as s from './style.css';

describe('<App />', () => {

    const component = renderComponent(App);

    it('Renders with correct style', () => {
        expect(component.find(s.appContainer)).to.exist;
    });

});
