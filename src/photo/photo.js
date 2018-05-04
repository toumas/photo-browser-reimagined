import { normalize } from 'normalizr';
import { getPhoto as apiGetPhoto } from '../api';
import { photoWithAlbum } from '../schemas';

const LOADING = 'APP/PHOTO/LOADING';
const SUCCESS = 'APP/PHOTO/SUCCESS';
const FAIL = 'APP/PHOTO/FAIL';

export default function reducer(
  state = { failed: false, isLoading: false, photo: {} },
  action = {},
) {
  switch (action.type) {
    case LOADING:
      return { ...state, failed: false, isLoading: action.isLoading };
    case SUCCESS:
      return { ...state, isLoading: action.isLoading, photo: action.photo };
    case FAIL:
      return { ...state, failed: true, isLoading: action.isLoading };
    default:
      return { ...state };
  }
}

export const getPhoto = state => state.photo.photo;
export const getFailed = state => state.photo.failed;
export const getIsLoading = state => state.photo.isLoading;

export const loading = () => ({ type: LOADING, isLoading: true });

export const success = photo => ({ type: SUCCESS, isLoading: false, photo });

export const fail = () => ({ type: FAIL, isLoading: false });

export const fetchPhoto = id => async dispatch => {
  dispatch(loading());
  try {
    const photo = await apiGetPhoto(id);
    const normalizedData = normalize(photo, photoWithAlbum);
    dispatch(success(normalizedData.entities.photos[id]));
  } catch (err) {
    dispatch(fail());
  }
};
