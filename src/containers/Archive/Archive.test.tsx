import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { Archive } from './Archive';

import * as s from './Archive.css';

xdescribe('<Archive />', () => {
    const component = renderComponent(Archive);

    xit('Renders with correct style', () => {
        expect(component.find(s.home)).to.exist;
    });
});
