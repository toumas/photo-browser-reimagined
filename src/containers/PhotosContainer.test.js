import React from 'react';
import { PhotosContainer, getPath } from './PhotosContainer';

/* eslint-disable no-undef */

function getProps() {
  return {
    failed: false,
    fetchPhotos: () => {},
    getPath,
    isLoading: false,
    match: { isExact: true, path: '/', url: '/', params: {} },
    photos: [
      {
        albumId: 1,
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'http://placehold.it/600/92c952',
        thumbnailUrl: 'http://placehold.it/150/92c952',
      },
      {
        albumId: 1,
        id: 2,
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'http://placehold.it/600/771796',
        thumbnailUrl: 'http://placehold.it/150/771796',
      },
    ],
  };
}

describe('PhotosContainer component', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <PhotosContainer {...getProps()}>
        {() => <div>child</div>}
      </PhotosContainer>,
    );
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should update page in state according to page route param', () => {
    const wrapper = shallow(
      <PhotosContainer {...getProps()}>
        {() => <div>children</div>}
      </PhotosContainer>,
    );
    expect(wrapper.state().options.page).toEqual('1');
    wrapper.setProps({
      match: { isExact: true, path: '/', url: '/', params: { page: '2' } },
    });
    expect(wrapper.state().options.page).toEqual('2');
  });

  it('should update album id in state according to route param', () => {
    const wrapper = shallow(
      <PhotosContainer {...getProps()}>
        {() => <div>children</div>}
      </PhotosContainer>,
    );
    expect(wrapper.state().options.albumId).toEqual(undefined);
    wrapper.setProps({
      match: {
        isExact: true,
        path: '/albums/:id/page/1',
        url: '/albums/1/page/1',
        params: { page: '1', albumId: '1' },
      },
    });
    expect(wrapper.state().options.albumId).toEqual('1');
  });

  it('should return proper path for navigation', () => {
    const wrapper = mount(
      <PhotosContainer {...getProps()}>{() => null}</PhotosContainer>,
    );
    expect(
      wrapper
        .props()
        .getPath(
          wrapper.props().match.url,
          wrapper.state().options.page,
          wrapper.props().photos[0].id,
        ),
    ).toEqual('/page/1/photo/1');
    wrapper.setProps({
      match: {
        path: '/page/:page',
        url: '/page/1',
        isExact: false,
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
          wrapper.props().photos[1].id,
        ),
    ).toEqual('/page/1/photo/2');
  });
});
