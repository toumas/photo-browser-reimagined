import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  PhotoContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './PhotoContainer';
import { fetchPhoto, getFailed, getIsLoading, getPhoto } from '../ducks/photo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* eslint-disable no-undef */

const getProps = () => ({
  match: {
    path: '/page/1/photo/:id',
    url: '/page/1/photo/1',
    isExact: true,
    params: {
      id: '1',
    },
  },
  failed: false,
  isLoading: false,
  photo: {},
  fetchPhoto: jest.fn(),
});

describe('PhotoContainer component', () => {
  it('renders its children', () => {
    const wrapper = shallow(
      <PhotoContainer {...getProps()}>{() => <div>child</div>}</PhotoContainer>,
    );
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('fetches photo on component mount', () => {
    const wrapper = shallow(
      <PhotoContainer {...getProps()}>{() => {}}</PhotoContainer>,
    );
    expect(wrapper.instance().props.fetchPhoto).toHaveBeenCalledTimes(1);
    wrapper.setProps({
      match: {
        path: '/page/1/photo/:id',
        url: '/page/1/photo/2',
        isExact: true,
        params: {
          id: '2',
        },
      },
    });
    expect(wrapper.instance().props.fetchPhoto).toHaveBeenCalledTimes(2);
  });

  it('fetches photo on component update', () => {
    const wrapper = shallow(
      <PhotoContainer {...getProps()}>{() => {}}</PhotoContainer>,
    );
    wrapper.setProps({
      match: {
        path: '/page/1/photo/:id',
        url: '/page/1/photo/2',
        isExact: true,
        params: {
          id: '2',
        },
      },
    });
    expect(wrapper.instance().props.fetchPhoto).toHaveBeenCalledTimes(2);
  });

  it('will not fetch photo on component update when props remain the same', () => {
    const wrapper = shallow(
      <PhotoContainer {...getProps()}>{() => {}}</PhotoContainer>,
    );
    wrapper.setProps({
      match: {
        path: '/page/1/photo/:id',
        url: '/page/1/photo/1',
        isExact: true,
        params: {
          id: '1',
        },
      },
    });
    expect(wrapper.instance().props.fetchPhoto).toHaveBeenCalledTimes(1);
  });

  it('should map dispatch to props', () => {
    const store = mockStore({
      photo: { failed: false, isLoading: false, photo: {} },
    });
    const props = mapDispatchToProps(store.dispatch);
    expect(props.fetchPhoto('1')).toEqual(fetchPhoto('1')(store.dispatch));
  });

  it('should map state to props', () => {
    const store = mockStore({
      photo: { failed: false, isLoading: false, photo: {} },
    });
    const state = store.getState();
    expect(mapStateToProps(state)).toEqual({
      failed: getFailed(state),
      isLoading: getIsLoading(state),
      photo: getPhoto(state),
    });
  });
});
