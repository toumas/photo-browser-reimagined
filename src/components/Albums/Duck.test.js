import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
  loading,
  success,
  fail,
  fetchAlbums,
  LOAD,
  SUCCESS,
  FAIL,
  getAlbums,
  applyThumbnailUrls,
  getFailed,
  getIsLoading,
} from './Duck';
import {
  LOAD as PHOTOS_LOAD,
  SUCCESS as PHOTOS_SUCCESS,
  FAIL as PHOTOS_FAIL,
} from '../Photos/Duck';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const albums = [
  {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
  },
  {
    userId: 1,
    id: 2,
    title: 'sunt qui excepturi placeat culpa',
  },
];

const normalizedAlbums = {
  '1': {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
  },
  '2': {
    userId: 1,
    id: 2,
    title: 'sunt qui excepturi placeat culpa',
  },
};

const normalizedPhotos = {
  '1': {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'http://placehold.it/600/92c952',
    thumbnailUrl: 'http://placehold.it/150/92c952',
  },
  '51': {
    albumId: 2,
    id: 51,
    title: 'non sunt voluptatem placeat consequuntur rem incidunt',
    url: 'http://placehold.it/600/8e973b',
    thumbnailUrl: 'http://placehold.it/150/8e973b',
  },
};

const thumbnail1 = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'http://placehold.it/600/92c952',
    thumbnailUrl: 'http://placehold.it/150/92c952',
  },
];

const thumbnail2 = [
  {
    albumId: 2,
    id: 51,
    title: 'non sunt voluptatem placeat consequuntur rem incidunt',
    url: 'http://placehold.it/600/8e973b',
    thumbnailUrl: 'http://placehold.it/150/8e973b',
  },
];

const thumbnailsUrls = {
  '1': 'http://placehold.it/150/92c952',
  '2': 'http://placehold.it/150/8e973b',
};

/* eslint-disable no-undef */

describe('action creators', () => {
  it('should create loading action', () => {
    const action = { type: LOAD, isLoading: true };
    expect(loading()).toEqual(action);
  });

  it('should create fail action', () => {
    const action = { type: FAIL, isLoading: false };
    expect(fail()).toEqual(action);
  });

  it('should create success action', () => {
    const action = {
      type: SUCCESS,
      isLoading: false,
      items: normalizedAlbums,
    };
    expect(success(normalizedAlbums)).toEqual(action);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create success action when fetch was successful', () => {
    fetchMock.getOnce('http://localhost:3000/albums?_page=1&_limit=2&', {
      body: { ...albums },
      headers: { 'content-type': 'application/json' },
    });

    fetchMock.getOnce('http://localhost:3000/photos?albumId=1&_limit=1&', {
      body: { ...thumbnail1 },
      headers: { 'content-type': 'application/json' },
    });

    fetchMock.getOnce('http://localhost:3000/photos?albumId=2&_limit=1&', {
      body: { ...thumbnail2 },
      headers: { 'content-type': 'application/json' },
    });

    const store = mockStore({
      albums: { failed: false, isLoading: false, items: {} },
    });
    const expectedActions = [
      { type: LOAD, isLoading: true },
      { type: PHOTOS_LOAD, isLoading: true },
      { type: SUCCESS, isLoading: false, items: normalizedAlbums },
      { type: PHOTOS_SUCCESS, isLoading: false, items: normalizedPhotos },
    ];

    return store.dispatch(fetchAlbums({ page: '1', limit: '2' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create fail action when fetch failed', () => {
    fetchMock.getOnce('http://localhost:3000/albums?_page=1&_limit=2&', {
      throws: new Error(),
    });

    const store = mockStore({
      albums: { failed: false, isLoading: false, items: {} },
    });
    const expectedActions = [
      { type: LOAD, isLoading: true },
      { type: FAIL, isLoading: false },
    ];

    return store.dispatch(fetchAlbums({ page: '1', limit: '2' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

it('should create fail action when fetching of thumbnails failed', () => {
  fetchMock.getOnce('http://localhost:3000/albums?_page=1&_limit=2&', {
    body: { ...albums },
    headers: { 'content-type': 'application/json' },
  });

  fetchMock.getOnce('http://localhost:3000/photos?albumId=1&_limit=1&', {
    throws: new Error(),
  });

  fetchMock.getOnce('http://localhost:3000/photos?albumId=2&_limit=1&', {
    throws: new Error(),
  });

  const store = mockStore({
    albums: { failed: false, isLoading: false, items: {} },
  });
  const expectedActions = [
    { type: LOAD, isLoading: true },
    { type: PHOTOS_LOAD, isLoading: true },
    { type: PHOTOS_FAIL, isLoading: false },
    { type: FAIL, isLoading: false },
  ];

  return store.dispatch(fetchAlbums({ page: '1', limit: '2' })).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('selectors', () => {
  it('should select failed', () => {
    const store = mockStore({
      albums: { failed: true, isLoading: false, items: {} },
    });
    expect(getFailed(store.getState())).toEqual(true);
  });

  it('should select isLoading', () => {
    const store = mockStore({
      albums: { failed: false, isLoading: true, items: {} },
    });
    expect(getIsLoading(store.getState())).toEqual(true);
  });

  it('should select albums', () => {
    const store = mockStore({
      photos: { items: normalizedPhotos },
      albums: { failed: false, isLoading: false, items: normalizedAlbums },
    });
    expect(getAlbums(store.getState())).toEqual(
      applyThumbnailUrls(thumbnailsUrls, store.getState().albums.items),
    );
  });
});

describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      failed: false,
      isLoading: false,
      items: {},
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
      reducer({}, { type: SUCCESS, isLoading: false, items: normalizedAlbums }),
    ).toEqual({
      isLoading: false,
      items: normalizedAlbums,
    });
  });

  it('should handle FAIL', () => {
    expect(reducer({}, { type: FAIL, isLoading: false })).toEqual({
      isLoading: false,
      failed: true,
    });
  });
});
