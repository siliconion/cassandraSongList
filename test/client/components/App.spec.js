import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import App from '../../../client/components/App.js';

describe('<App />', () => {
  let wrapper;
  beforeEach('Setup MyComponent wrapper', () => {
    wrapper = shallow(
      <App />
    );
  });
  it('should render a nav bar', () => {
    expect(wrapper.find('Nav').length).to.equal(1);
  });
  it('should render a main component', () =>{
    expect(wrapper.find('.main').length).to.equal(1);
  })
  it('should render an auth component', () =>{
    expect(wrapper.find('.auth').length).to.equal(1);
  })
});
