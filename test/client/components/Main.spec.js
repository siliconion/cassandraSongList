import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Main from '../../../client/components/Main.js';

describe("<Main />", function () {
  let wrapper;
  const tags = ['a', 'b', 'c'];
  beforeEach('Setup MyComponent wrapper', () => {
    wrapper = shallow(
      <SampleTagList tags={ tags } />
    );
  });
  it("should render the same number of tags given as props", function () {
    expect(wrapper.find('.sample-tag').length).to.equal(tags.length);
  });
  it("should render the each tag as text", function () {
    expect(wrapper.find('.sample-tag').map(ele => ele.text())).to.deep.equal(tags);
  });
});
