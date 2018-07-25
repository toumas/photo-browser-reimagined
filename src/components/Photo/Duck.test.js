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
} from './Duck.ts';

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
    const action = {
      type: LOAD,
      payload: { isLoading: true },
      meta: undefined,
    };
    expect(loading()).toEqual(action);
  });

  it('should create success action', () => {
    const action = {
      type: SUCCESS,
      payload: {
        isLoading: false,
        photo: normalizedPhoto,
      },
      meta: undefined,
    };
    expect(success(normalizedPhoto)).toEqual(action);
  });

  it('should create fail action', () => {
    const action = {
      type: FAIL,
      payload: { isLoading: false },
      meta: undefined,
    };
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
      { type: LOAD, payload: { isLoading: true }, meta: undefined },
      {
        type: SUCCESS,
        payload: {
          isLoading: false,
          photo: normalizedPhoto,
          meta: undefined,
        },
      },
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
      { type: LOAD, payload: { isLoading: true }, meta: undefined },
      { type: FAIL, payload: { isLoading: false }, meta: undefined },
    ];

    return store.dispatch(fetchPhoto(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('selectors', () => {
  it('should select photo', () => {
    const store = mockStore({
      photo: {
        failed: false,
        isLoading: false,
        photo: normalizedPhoto,
      },
    });
    expect(getPhoto(store.getState())).toEqual(normalizedPhoto);
  });

  it('should select failed', () => {
    const store = mockStore({
      photo: {
        failed: true,
        payload: {
          isLoading: false,
          photo: normalizedPhoto,
          meta: undefined,
        },
      },
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
    expect(
      reducer(
        {},
        { type: LOAD, payload: { isLoading: true }, meta: undefined },
      ),
    ).toEqual({
      isLoading: true,
      failed: false,
    });
  });

  it('should handle SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: SUCCESS,
          payload: {
            isLoading: false,
            photo: normalizedPhoto,
            meta: undefined,
          },
        },
      ),
    ).toEqual({
      isLoading: false,
      photo: normalizedPhoto,
    });
  });

  it('should handle FAIL', () => {
    expect(
      reducer(
        {},
        { type: FAIL, payload: { isLoading: false }, meta: undefined },
      ),
    ).toEqual({
      isLoading: false,
      failed: true,
    });
  });
});
