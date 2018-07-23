import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import PhotoList from './PhotoList.tsx';

/* eslint-disable no-undef */

function getProps() {
  return {
    isLoading: true,
    failed: false,
    getPath: () => '',
    items: [
      {
        albumId: 1,
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'http://placehold.it/600/92c952',
        thumbnailUrl: 'http://placehold.it/150/92c952',
      },
    ],
    retry: () => {},
  };
}

describe('PhotoList component', () => {
  it('should render loading text when isLoading prop equals true', () => {
    const wrapper = shallow(<PhotoList {...getProps()} />);
    expect(wrapper.text()).toEqual('Loading...');
  });

  it('should render retry component when failed prop equals true', () => {
    const wrapper = shallow(<PhotoList {...getProps()} />);
    wrapper.setProps({ failed: true, isLoading: false });
    expect(wrapper.find('Retry')).toHaveLength(1);
  });

  it('should render thumbnails when props isLoading and failed equal false', () => {
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<PhotoList {...getProps()} />, options.get());
    wrapper.setProps({ isLoading: false, failed: false });
    expect(wrapper.find('.thumbnail')).toHaveLength(
      wrapper.props().items.length,
    );
  });
});
