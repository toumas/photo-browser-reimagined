import { normalize } from 'normalizr';
import { action as createAction } from 'typesafe-actions';

import { getPhotos as apiGetPhotos } from '../../api';
import { photoList } from '../../schemas';
import { FetchOptions, Photo } from '../../typings';

export const LOAD: string = 'app/photos/LOAD';
export const SUCCESS: string = 'app/photos/SUCCESS';
export const FAIL: string = 'app/photos/FAIL';

interface PhotosObj {
  readonly [key: string]: Photo;
}

interface State {
  readonly failed: boolean;
  readonly isLoading: boolean;
  readonly items: PhotosObj;
}

export interface ThumbnailUrl {
  [key: number]: string;
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

export const getPhotos = (state) => state.photos.items;
export const getFailed = (state) => state.photos.failed;
export const getIsLoading = (state) => state.photos.isLoading;
export const getThumbnails = (state): ThumbnailUrl =>
  Object.values(getPhotos(state)).reduce(
    (acc, photo: Photo) =>
      acc[photo.albumId]
        ? { ...acc }
        : { ...acc, [photo.albumId]: photo.thumbnailUrl },
    {},
  ) as ThumbnailUrl;

export const loading = () => createAction(LOAD, { isLoading: true });

export const success = (items: PhotosObj) =>
  createAction(SUCCESS, { items, isLoading: false });

export const fail = () => createAction(FAIL, { isLoading: false });

export const fetchPhotos = (options: FetchOptions) => async (dispatch) => {
  dispatch(loading());
  try {
    const photos: Photo[] = await apiGetPhotos(options);
    const normalizedData = normalize(photos, photoList);
    dispatch(success(normalizedData.entities.photos));
  } catch (err) {
    dispatch(fail());
  }
};
