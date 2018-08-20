import { normalize } from 'normalizr';
import { action as createAction } from 'typesafe-actions';

import { getAlbums as apiGetAlbums, getPhotos } from '../../api';
import { albumList, photoList } from '../../schemas';
import { Album, FetchOptions } from '../../typings';
import {
  fail as photosFail,
  getThumbnails,
  loading as photosLoading,
  PhotosResponse,
  success as photosSuccess,
  ThumbnailUrl,
} from '../Photos/Duck';

export const LOAD: string = 'app/albums/LOAD';
export const SUCCESS: string = 'app/albums/SUCCESS';
export const FAIL: string = 'app/albums/FAIL';

interface AlbumsObj {
  [key: string]: Album;
}

interface AlbumsResponse {
  readonly data: AlbumsObj;
  readonly totalCount: number;
}

export interface AlbumsState {
  readonly failed: boolean;
  readonly isLoading: boolean;
  readonly items: AlbumsObj;
  readonly totalCount: number;
}

const defaultState: AlbumsState = {
  failed: false,
  isLoading: false,
  items: {},
  totalCount: 0,
};

export default function reducer(state: AlbumsState = defaultState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, failed: false, isLoading: action.payload.isLoading };
    case SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        items: action.payload.items,
        totalCount: action.payload.totalCount,
      };
    case FAIL:
      return { ...state, failed: true, isLoading: action.payload.isLoading };
    default:
      return { ...state };
  }
}

export const applyThumbnailUrls = (thumbnailsUrls, items: AlbumsObj) =>
  Object.entries(thumbnailsUrls).reduce((acc, entry) => {
    if (typeof items[entry[0]] !== 'undefined') {
      return {
        ...acc,
        [entry[0]]: { ...items[entry[0]], thumbnailUrl: entry[1] },
      };
    }
    return { ...acc };
  }, {});

export const getTotalCount = (state) => state.albums.totalCount;
export const getFailed = (state) => state.albums.failed;
export const getIsLoading = (state) => state.albums.isLoading;
export const getAlbums = (state) => {
  const thumbnailsUrls: ThumbnailUrl = getThumbnails(state);
  return applyThumbnailUrls(thumbnailsUrls, state.albums.items);
};

export const loading = () => createAction(LOAD, { isLoading: true });

export const success = ({ data: items, totalCount }: AlbumsResponse) =>
  createAction(SUCCESS, { items, totalCount, isLoading: false });

export const fail = () => createAction(FAIL, { isLoading: false });

export const fetchAlbums = (options: FetchOptions) => async (dispatch) => {
  dispatch(loading());
  try {
    const albumsResponse: AlbumsResponse = await apiGetAlbums(options);
    const normalizedData = normalize(albumsResponse.data, albumList);
    dispatch(photosLoading());
    try {
      const photoResponses = await Promise.all(
        normalizedData.result.map((albumId) =>
          getPhotos({ albumId, limit: '1' }),
        ),
      );
      const photos = photoResponses.map((res: PhotosResponse) => res.data);
      const normalizedPhotos = normalize(photos, [photoList]);
      dispatch(
        success({
          data: normalizedData.entities.albums,
          totalCount: albumsResponse.totalCount,
        }),
      );
      dispatch(
        photosSuccess({
          data: normalizedPhotos.entities.photos,
          totalCount: 0,
        }),
      );
    } catch (err) {
      dispatch(photosFail());
      throw new Error('Failed to load thumbnails');
    }
  } catch (err) {
    dispatch(fail());
  }
};
