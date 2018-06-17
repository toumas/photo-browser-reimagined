import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
  loading,
  success,
  fail,
  LOAD,
  SUCCESS,
  FAIL,
  fetchPhoto,
  getPhoto,
  getFailed,
  getIsLoading,
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

    const store = mockStore({
      photo: { failed: false, isLoading: false, photo: {} },
    });
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

    const store = mockStore({
      photo: { failed: false, isLoading: false, photo: {} },
    });
    const expectedActions = [
      { type: LOAD, isLoading: true },
      { type: FAIL, isLoading: false },
    ];

    return store.dispatch(fetchPhoto(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('selectors', () => {
  it('should select photo', () => {
    const store = mockStore({
      photo: { failed: false, isLoading: false, photo: normalizedPhoto },
    });
    expect(getPhoto(store.getState())).toEqual(normalizedPhoto);
  });

  it('should select failed', () => {
    const store = mockStore({
      photo: { failed: true, isLoading: false, photo: normalizedPhoto },
    });
    expect(getFailed(store.getState())).toEqual(true);
  });

  it('should select isLoading', () => {
    const store = mockStore({
      photo: { failed: false, isLoading: true, photo: normalizedPhoto },
    });
    expect(getIsLoading(store.getState())).toEqual(true);
  });
});

describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      failed: false,
      isLoading: false,
      photo: {},
    });
  });

  it('should handle LOAD', () => {
    expect(reducer({}, { type: LOAD, isLoading: true })).toEqual({
      isLoading: true,
      failed: false,
    });
  });

  it('should handle SUCCESS', () => {
    expect(
      reducer({}, { type: SUCCESS, isLoading: false, photo: normalizedPhoto }),
    ).toEqual({
      isLoading: false,
      photo: normalizedPhoto,
    });
  });

  it('should handle FAIL', () => {
    expect(reducer({}, { type: FAIL, isLoading: false })).toEqual({
      isLoading: false,
      failed: true,
    });
  });
});
