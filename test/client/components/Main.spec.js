import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Main from '../../../client/components/Main.js';

describe("<Main />", function () {
  let wrapper;
  beforeEach('Setup MyComponent wrapper', () => {
    wrapper = shallow(
      <Main />
    );
  });
  it("should render a song list", function () {
    expect(wrapper.find('.songList').length).to.equal(1);
  });
  it("should render a song form", function () {
    expect(wrapper.find('.songForm').length).to.equal(1);
  });
});
