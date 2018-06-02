import React from 'react';
import { PhotosContainer } from './PhotosContainer';

/* eslint-disable no-undef */

function getProps() {
  return {
    failed: false,
    fetchPhotos: () => {},
    getPath: () => {},
    isLoading: false,
    match: { isExact: true, path: '/', url: '/', params: {} },
    photos: [],
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
});
