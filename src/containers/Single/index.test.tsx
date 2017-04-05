import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { Single } from './index';

import * as s from './style.css';

describe('<Single />', () => {
    const component = renderComponent(Single, {}, { params: { postId: 1 } });

    xit('Renders with correct style', () => {
        expect(component.find(s.home)).to.exist;
    });
});
