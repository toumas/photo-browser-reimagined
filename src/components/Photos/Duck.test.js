import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
  loading,
  success,
  fail,
  fetchPhotos,
  LOAD,
  SUCCESS,
  FAIL,
  getFailed,
  getIsLoading,
  getPhotos,
  getThumbnails,
} from './Duck.ts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const photos = [
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
];

const normalizedPhotos = {
  '1': {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'http://placehold.it/600/92c952',
    thumbnailUrl: 'http://placehold.it/150/92c952',
  },
  '2': {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'http://placehold.it/600/771796',
    thumbnailUrl: 'http://placehold.it/150/771796',
  },
};

const thumbnailsUrls = {
  '1': 'http://placehold.it/150/92c952',
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

  it('should create fail action', () => {
    const action = {
      type: FAIL,
      payload: { isLoading: false },
      meta: undefined,
    };
    expect(fail()).toEqual(action);
  });

  it('should create success action', () => {
    const action = {
      type: SUCCESS,
      payload: {
        isLoading: false,
        items: normalizedPhotos,
        totalCount: 2,
      },
      meta: undefined,
    };
    expect(success({ data: normalizedPhotos, totalCount: 2 })).toEqual(action);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create success action when fetch was successful', () => {
    fetchMock.getOnce('http://localhost:3000/photos?_page=1&_limit=2&', {
      body: { ...photos },
      headers: { 'content-type': 'application/json', 'X-Total-Count': '2' },
    });

    const store = mockStore({
      photos: { failed: false, isLoading: false, items: {} },
    });
    const expectedActions = [
      { type: LOAD, payload: { isLoading: true }, meta: undefined },
      {
        type: SUCCESS,
        payload: { isLoading: false, items: normalizedPhotos, totalCount: 2 },
        meta: undefined,
      },
    ];

    return store.dispatch(fetchPhotos({ page: '1', limit: '2' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should default totalCount to 0 if X-Total-Count header is not present', () => {
    fetchMock.getOnce('http://localhost:3000/photos?_page=1&_limit=2&', {
      body: { ...photos },
      headers: { 'content-type': 'application/json' },
    });

    const store = mockStore({
      photos: { failed: false, isLoading: false, items: {} },
    });
    const expectedActions = [
      { type: LOAD, payload: { isLoading: true }, meta: undefined },
      {
        type: SUCCESS,
        payload: { isLoading: false, items: normalizedPhotos, totalCount: 0 },
        meta: undefined,
      },
    ];

    return store.dispatch(fetchPhotos({ page: '1', limit: '2' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create fail action when fetch failed', () => {
    fetchMock.getOnce('http://localhost:3000/photos?_page=1&_limit=2&', {
      throws: new Error(),
    });

    const store = mockStore({
      photos: { failed: false, isLoading: false, items: {} },
    });
    const expectedActions = [
      { type: LOAD, payload: { isLoading: true }, meta: undefined },
      { type: FAIL, payload: { isLoading: false }, meta: undefined },
    ];

    return store.dispatch(fetchPhotos({ page: '1', limit: '2' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('selectors', () => {
  it('should select photos', () => {
    const store = mockStore({
      photos: { failed: true, isLoading: false, items: normalizedPhotos },
    });
    expect(getPhotos(store.getState())).toEqual(normalizedPhotos);
  });
  it('should select failed', () => {
    const store = mockStore({
      photos: { failed: true, isLoading: false, items: {} },
    });
    expect(getFailed(store.getState())).toEqual(true);
  });

  it('should select isLoading', () => {
    const store = mockStore({
      photos: { failed: false, isLoading: true, items: {} },
    });
    expect(getIsLoading(store.getState())).toEqual(true);
  });

  it('should select thumbnails', () => {
    const store = mockStore({
      photos: { failed: false, isLoading: false, items: normalizedPhotos },
    });
    expect(getThumbnails(store.getState())).toEqual(thumbnailsUrls);
  });
});

describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      failed: false,
      isLoading: false,
      items: {},
      totalCount: 0,
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
          payload: { isLoading: false, items: normalizedPhotos },
          meta: undefined,
        },
      ),
    ).toEqual({
      isLoading: false,
      items: normalizedPhotos,
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
