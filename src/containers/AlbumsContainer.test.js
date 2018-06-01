import React from 'react';
import { AlbumsContainer } from './AlbumsContainer';

/* eslint-disable no-undef */

function getProps() {
  return {
    match: {
      path: '/albums',
      url: '/albums',
      isExact: true,
      params: {},
    },
    failed: false,
    isLoading: false,
    albums: [
      {
        userId: 1,
        id: 1,
        title: 'quidem molestiae enim',
        thumbnailUrl: 'http://placehold.it/150/92c952',
      },
    ],
    fetchAlbums: () => {},
    getPath: () => {},
  };
}

describe('AlbumsContainer component', () => {
  it('should render chilren', () => {
    const wrapper = shallow(
      <AlbumsContainer {...getProps()}>
        {() => <div>child</div>}
      </AlbumsContainer>,
    );
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should update page in state according to page route param', () => {
    const wrapper = shallow(
      <AlbumsContainer {...getProps()}>{() => {}}</AlbumsContainer>,
    );
    expect(wrapper.state().options.page).toEqual('1');
    wrapper.setProps({
      match: { isExact: true, path: '/', url: '/', params: { page: '2' } },
    });
    expect(wrapper.state().options.page).toEqual('2');
  });
});
