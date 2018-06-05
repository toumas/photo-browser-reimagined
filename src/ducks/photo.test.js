import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  loading,
  success,
  fail,
  LOAD,
  SUCCESS,
  FAIL,
  fetchPhoto,
} from './photo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const photo = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'http://placehold.it/600/92c952',
  thumbnailUrl: 'http://placehold.it/150/92c952',
  album: {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
  },
};
const normalizedPhoto = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'http://placehold.it/600/92c952',
  thumbnailUrl: 'http://placehold.it/150/92c952',
  album: 1,
};

/* eslint-disable no-undef */

describe('action creators', () => {
  it('should create loading action', () => {
    const action = { type: LOAD, isLoading: true };
    expect(loading()).toEqual(action);
  });

  it('should create success action', () => {
    const action = {
      type: SUCCESS,
      isLoading: false,
      photo: normalizedPhoto,
    };
    expect(success(normalizedPhoto)).toEqual(action);
  });

  it('should create fail action', () => {
    const action = { type: FAIL, isLoading: false };
    expect(fail()).toEqual(action);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create success action when fetch was successful', () => {
    fetchMock.getOnce('http://localhost:3000/photos/1?_expand=album&', {
      body: { ...photo },
      headers: { 'content-type': 'application/json' },
    });

    const store = mockStore({ photo: {} });
    const expectedActions = [
      { type: LOAD, isLoading: true },
      { type: SUCCESS, isLoading: false, photo: normalizedPhoto },
    ];

    return store.dispatch(fetchPhoto(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create fail action when fetch failed', () => {
    fetchMock.getOnce('http://localhost:3000/photos/1?_expand=album&', {
      throws: new Error(),
    });

    const store = mockStore({ photo: {} });
    const expectedActions = [
      { type: LOAD, isLoading: true },
      { type: FAIL, isLoading: false },
    ];

    return store.dispatch(fetchPhoto(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
