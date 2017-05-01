import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { Page } from './Page';

import * as s from './Page.css';

xdescribe('<Page />', () => {
    const component = renderComponent(Page);

    it('Renders with correct style', () => {
        expect(component.find(s.about)).to.exist;
    });

    it('Renders header with text', () => {
        expect(component.find('h4').text()).to.eql('Page');
    });
});
