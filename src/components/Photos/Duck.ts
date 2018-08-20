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

interface PhotosResponse {
  readonly data: Photo[];
  readonly totalCount: number;
}

export interface PhotosState {
  readonly failed: boolean;
  readonly isLoading: boolean;
  readonly items: PhotosObj;
  readonly totalCount: number;
}

export interface ThumbnailUrl {
  [key: number]: string;
}

const defaultState: PhotosState = {
  failed: false,
  isLoading: false,
  items: {},
  totalCount: 0,
};

export default function reducer(state: PhotosState = defaultState, action) {
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

export const getPhotos = (state) => state.photos.items;
export const getTotalCount = (state) => state.photos.totalCount;
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

export const success = ({ data: items, totalCount }: PhotosResponse) =>
  createAction(SUCCESS, { items, totalCount, isLoading: false });

export const fail = () => createAction(FAIL, { isLoading: false });

export const fetchPhotos = (options: FetchOptions) => async (dispatch) => {
  dispatch(loading());
  try {
    const photosResponse: PhotosResponse = await apiGetPhotos(options);
    const normalizedData = normalize(photosResponse.data, photoList);
    dispatch(
      success({
        data: normalizedData.entities.photos,
        totalCount: photosResponse.totalCount,
      }),
    );
  } catch (err) {
    dispatch(fail());
  }
};
