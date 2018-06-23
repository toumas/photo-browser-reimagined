import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  AlbumsContainer,
  getPath,
  mapDispatchToProps,
  mapStateToProps,
} from './Container';
import { getFailed, getIsLoading, getAlbums, fetchAlbums } from './Duck';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
    fetchAlbums: jest.fn(),
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

  it('will not update page in state when props remain same', () => {
    const wrapper = shallow(
      <AlbumsContainer {...getProps()}>{() => {}}</AlbumsContainer>,
    );
    expect(wrapper.state().options.page).toEqual('1');
    wrapper.setProps({
      match: {
        isExact: true,
        path: '/',
        url: '/',
        params: { page: undefined },
      },
    });
    expect(wrapper.state().options.page).toEqual('1');
  });

  it('should return proper path for navigation', () => {
    const wrapper = shallow(
      <AlbumsContainer {...getProps()}>{() => null}</AlbumsContainer>,
    );
    expect(wrapper.instance().getPath('1')).toEqual('/albums/1/page/1');

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

    expect(wrapper.instance().getPath('2')).toEqual('/albums/2/page/1');
  });

  it('should fetch albums on component mount', () => {
    const wrapper = shallow(
      <AlbumsContainer {...getProps()}>{() => {}}</AlbumsContainer>,
    );
    expect(wrapper.instance().props.fetchAlbums).toHaveBeenCalledTimes(1);
  });

  it('should fetch albums on component update', () => {
    const wrapper = shallow(
      <AlbumsContainer {...getProps()}>{() => {}}</AlbumsContainer>,
    );
    wrapper.setProps({
      match: {
        path: '/albums/page/:page',
        url: '/albums/page/2',
        isExact: true,
        params: {
          page: '2',
        },
      },
    });
    expect(wrapper.instance().props.fetchAlbums).toHaveBeenCalledTimes(2);
  });

  it('should map dispatch to props', () => {
    const store = mockStore({
      albums: { failed: false, isLoading: false, items: {} },
    });
    const props = mapDispatchToProps(store.dispatch);
    expect(props.fetchAlbums('1')).toEqual(fetchAlbums('1')(store.dispatch));
  });

  it('should map state to props', () => {
    const store = mockStore({
      albums: { failed: false, isLoading: false, items: {} },
      photos: { failed: false, isLoading: false, items: {} },
    });
    const state = store.getState();
    expect(mapStateToProps(state)).toEqual({
      failed: getFailed(state),
      isLoading: getIsLoading(state),
      albums: Object.values(getAlbums(state)),
    });
  });
});
