import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  PhotosContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './PhotosContainer';
import {
  fetchPhotos,
  getFailed,
  getIsLoading,
  getPhotos,
} from '../ducks/photos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* eslint-disable no-undef */

function getProps() {
  return {
    failed: false,
    fetchPhotos: jest.fn(),
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
    wrapper.setProps({
      match: {
        isExact: true,
        path: '/',
        url: '/',
        params: { page: undefined },
      },
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
    expect(wrapper.instance().getPath(1)).toEqual('/page/1/photo/1');
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
    expect(wrapper.instance().getPath(2)).toEqual('/page/1/photo/2');
  });

  it('should begin fetching photos on mount and on update', () => {
    const wrapper = shallow(
      <PhotosContainer {...getProps()}>{() => null}</PhotosContainer>,
    );
    expect(wrapper.instance().props.fetchPhotos).toHaveBeenCalledTimes(1);
    wrapper.setProps({
      match: {
        path: '/page/:page',
        url: '/page/2',
        isExact: false,
        params: {
          page: '2',
        },
      },
    });
    expect(wrapper.instance().props.fetchPhotos).toHaveBeenCalledTimes(2);
  });

  it('should map dispatch to props', () => {
    const store = mockStore({
      photos: { failed: false, isLoading: false, photos: {} },
    });
    expect(
      mapDispatchToProps(store.dispatch).fetchPhotos({
        page: '1',
        limit: '10',
      }),
    ).toEqual(
      fetchPhotos({
        page: '1',
        limit: '10',
      })(store.dispatch),
    );
  });

  it('should map state to props', () => {
    const store = mockStore({
      photos: { failed: false, isLoading: false, items: {} },
    });
    expect(mapStateToProps(store.getState())).toEqual({
      failed: getFailed(store.getState()),
      isLoading: getIsLoading(store.getState()),
      photos: Object.values(getPhotos(store.getState())),
    });
  });
});
