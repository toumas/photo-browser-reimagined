import { normalize } from 'normalizr';
import { action as createAction } from 'typesafe-actions';

import { getPhoto as apiGetPhoto } from '../../api';
import { photoWithAlbum } from '../../schemas';
import { Photo } from '../../typings';

export const LOAD: string = 'app/photo/LOAD';
export const SUCCESS: string = 'app/photo/SUCCESS';
export const FAIL: string = 'app/photo/FAIL';

export interface PhotoState {
  readonly failed: boolean;
  readonly isLoading: boolean;
  readonly photo: Photo;
}

const defaultState: PhotoState = {
  failed: false,
  isLoading: false,
  // tslint:disable-next-line
  photo: {} as Photo,
};

export default function reducer(state: PhotoState = defaultState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, failed: false, isLoading: action.payload.isLoading };
    case SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        photo: action.payload.photo,
      };
    case FAIL:
      return { ...state, failed: true, isLoading: action.payload.isLoading };
    default:
      return { ...state };
  }
}

export const getPhoto = (state) => state.photo.photo;
export const getFailed = (state) => state.photo.failed;
export const getIsLoading = (state) => state.photo.isLoading;

export const loading = () => createAction(LOAD, { isLoading: true });

export const success = (photo: Photo) =>
  createAction(SUCCESS, { photo, isLoading: false });

export const fail = () => createAction(FAIL, { isLoading: false });

export const fetchPhoto = (id: string) => async (dispatch) => {
  dispatch(loading());
  try {
    const photo: Photo = await apiGetPhoto(id);
    const normalizedData = normalize(photo, photoWithAlbum);
    dispatch(success(normalizedData.entities.photos[id]));
  } catch (err) {
    dispatch(fail());
  }
};
