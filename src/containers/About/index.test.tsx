import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { About } from './index';

import * as s from './style.css';

xdescribe('<About />', () => {
    const component = renderComponent(About);

    it('Renders with correct style', () => {
        expect(component.find(s.about)).to.exist;
    });

    it('Renders header with text', () => {
        expect(component.find('h4').text()).to.eql('About');
    });
});
