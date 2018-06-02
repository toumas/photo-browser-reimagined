import React from 'react';
import Retry from './Retry';

/* eslint-disable no-undef */

function getProps() {
  return {
    text: 'Loading...',
    handleClick: jest.fn(),
  };
}

describe('Retry component', () => {
  it('should render text', () => {
    const wrapper = mount(<Retry {...getProps()} />);
    expect(wrapper.find('span').text()).toEqual(wrapper.props().text);
  });

  it('should invoke handleClick on click', () => {
    const wrapper = mount(<Retry {...getProps()} />);
    wrapper.find('button').simulate('click');
    expect(wrapper.props().handleClick).toHaveBeenCalledTimes(1);
  });
});
