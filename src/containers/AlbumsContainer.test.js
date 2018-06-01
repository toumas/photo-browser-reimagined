import React from 'react';
import { AlbumsContainer, getPath } from './AlbumsContainer';

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
    getPath,
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

  it('should return proper path for navigation', () => {
    const wrapper = mount(
      <AlbumsContainer {...getProps()}>{() => null}</AlbumsContainer>,
    );
    expect(
      wrapper
        .props()
        .getPath(
          wrapper.props().match.url,
          wrapper.state().options.page,
          wrapper.props().albums[0].id,
        ),
    ).toEqual('/albums/1/page/1');
    wrapper.setProps({
      match: {
        path: '/albums/page/:page',
        url: '/albums/page/1',
        isExact: true,
        params: {
          page: '1',
        },
      },
    });
    expect(
      wrapper
        .props()
        .getPath(
          wrapper.props().match.url,
          wrapper.state().options.page,
          wrapper.props().albums[0].id,
        ),
    ).toEqual('/albums/1/page/1');
  });
});
