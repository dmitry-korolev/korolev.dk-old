import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { Archive } from './index';

describe('<Archive />', () => {
    const component = renderComponent(Archive);

    xit('Renders with correct style', () => {
        const s = require('./style.css');
        expect(component.find(s.home)).to.exist;
    });
});
