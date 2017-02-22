import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { Single } from './index';

describe('<Single />', () => {
    const component = renderComponent(Single);

    it('Renders with correct style', () => {
        const s = require('./style.css');
        expect(component.find(s.home)).to.exist;
    });
});
