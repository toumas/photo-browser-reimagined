import React from 'react';
import Photo from './Photo.tsx';

/* eslint-disable no-undef */

function getProps() {
  return {
    isLoading: true,
    failed: false,
    photo: {
      albumId: 1,
      id: 1,
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'http://placehold.it/600/92c952',
      thumbnailUrl: 'http://placehold.it/150/92c952',
    },
    retry: () => {},
  };
}

describe('Photo component', () => {
  it('should render loading text when isLoading prop equals true', () => {
    const wrapper = shallow(<Photo {...getProps()} />);
    expect(wrapper.text()).toEqual('Loading...');
  });

  it('should render retry component when failed prop equals true', () => {
    const wrapper = shallow(<Photo {...getProps()} />);
    wrapper.setProps({ failed: true, isLoading: false });
    expect(wrapper.find('Retry')).toHaveLength(1);
  });

  it('should render photo modal when props isLoading and failed equal false', () => {
    const wrapper = shallow(<Photo {...getProps()} />);
    wrapper.setProps({ isLoading: false, failed: false });
    expect(wrapper.find('Modal > Image')).toHaveLength(1);
  });
});
