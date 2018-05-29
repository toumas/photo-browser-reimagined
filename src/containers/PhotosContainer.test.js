import React from 'react';
import { PhotosContainer } from './PhotosContainer';

/* eslint-disable no-undef */

describe('PhotosContainer component', () => {
  it('renders its children', () => {
    const props = {
      failed: false,
      fetchPhotos: () => {},
      getPath: () => {},
      isLoading: false,
      match: { isExact: true, path: '/', url: '/', params: {} },
      photos: [],
    };
    const wrapper = shallow(
      <PhotosContainer {...props}>{() => <div>children</div>}</PhotosContainer>,
    );
    expect(wrapper.find('div').text()).toEqual('children');
  });

  it('page changes according to route param', () => {
    const props = {
      failed: false,
      fetchPhotos: () => {},
      getPath: () => {},
      isLoading: false,
      match: { isExact: true, path: '/page/:page', url: '/page/2', params: {} },
      photos: [],
    };
    const wrapper = shallow(
      <PhotosContainer {...props}>{() => <div>children</div>}</PhotosContainer>,
    );
    expect(wrapper.state().options.page).toEqual('1');
    wrapper.setProps({
      match: { isExact: true, path: '/', url: '/', params: { page: '2' } },
    });
    expect(wrapper.state().options.page).toEqual('2');
  });

  it('album id changes according to route param', () => {
    const props = {
      failed: false,
      fetchPhotos: () => {},
      getPath: () => {},
      isLoading: false,
      match: {
        isExact: true,
        path: '/',
        url: '/',
        params: {},
      },
      photos: [],
    };
    const wrapper = shallow(
      <PhotosContainer {...props}>{() => <div>children</div>}</PhotosContainer>,
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
