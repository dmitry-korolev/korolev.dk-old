import { expect } from 'chai'
import { renderComponent } from 'helpers/TestHelper'
import { App } from './App'

import * as s from './App.css'

describe('<App />', () => {
  const component = renderComponent(App)
  it('Renders with correct style', () => {
    expect(component.find(s.appContainer)).to.exist
  })
})
