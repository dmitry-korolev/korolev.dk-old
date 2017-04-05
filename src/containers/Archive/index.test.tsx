import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { Archive } from './index';

import * as s from './style.css';

describe('<Archive />', () => {
    const component = renderComponent(Archive);

    xit('Renders with correct style', () => {
        expect(component.find(s.home)).to.exist;
    });
});
