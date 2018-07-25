import { normalize } from 'normalizr';
import { action as createAction } from 'typesafe-actions';

import { getAlbums as apiGetAlbums, getPhotos } from '../../api';
import { albumList, photoList } from '../../schemas';
import { Album, FetchOptions } from '../../typings';
import {
  fail as photosFail,
  getThumbnails,
  loading as photosLoading,
  success as photosSuccess,
  ThumbnailUrl,
} from '../Photos/Duck';

export const LOAD: string = 'app/albums/LOAD';
export const SUCCESS: string = 'app/albums/SUCCESS';
export const FAIL: string = 'app/albums/FAIL';

interface AlbumsObj {
  [key: string]: Album;
}

interface State {
  readonly failed: boolean;
  readonly isLoading: boolean;
  readonly items: AlbumsObj;
}

const defaultState: State = { failed: false, isLoading: false, items: {} };

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, failed: false, isLoading: action.payload.isLoading };
    case SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        items: action.payload.items,
      };
    case FAIL:
      return { ...state, failed: true, isLoading: action.payload.isLoading };
    default:
      return { ...state };
  }
}

export const applyThumbnailUrls = (thumbnailsUrls, items: AlbumsObj) =>
  Object.entries(thumbnailsUrls).reduce(
    (acc, entry) => ({
      ...acc,
      [entry[0]]: { ...items[entry[0]], thumbnailUrl: entry[1] },
    }),
    {},
  );

export const getFailed = (state) => state.albums.failed;
export const getIsLoading = (state) => state.albums.isLoading;
export const getAlbums = (state) => {
  const thumbnailsUrls: ThumbnailUrl = getThumbnails(state);
  return applyThumbnailUrls(thumbnailsUrls, state.albums.items);
};

export const loading = () => createAction(LOAD, { isLoading: true });

export const success = (items: AlbumsObj) =>
  createAction(SUCCESS, { items, isLoading: false });

export const fail = () => createAction(FAIL, { isLoading: false });

export const fetchAlbums = (options: FetchOptions) => async (dispatch) => {
  dispatch(loading());
  try {
    const albums: AlbumsObj = await apiGetAlbums(options);
    const normalizedData = normalize(albums, albumList);
    dispatch(photosLoading());
    try {
      const photos = await Promise.all(
        normalizedData.result.map((albumId) =>
          getPhotos({ albumId, limit: 1 }),
        ),
      );
      const normalizedPhotos = normalize(photos, [photoList]);
      dispatch(success(normalizedData.entities.albums));
      dispatch(photosSuccess(normalizedPhotos.entities.photos));
    } catch (err) {
      dispatch(photosFail());
      throw new Error('Failed to load thumbnails');
    }
  } catch (err) {
    dispatch(fail());
  }
};
