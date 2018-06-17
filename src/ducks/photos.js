import { normalize } from 'normalizr';
import { getPhotos as apiGetPhotos } from '../api';
import { photoList } from '../schemas';

export const LOAD = 'app/photos/LOAD';
export const SUCCESS = 'app/photos/SUCCESS';
export const FAIL = 'app/photos/FAIL';

export default function reducer(
  state = { failed: false, isLoading: false, items: {} },
  action,
) {
  switch (action.type) {
    case LOAD:
      return { ...state, failed: false, isLoading: action.isLoading };
    case SUCCESS:
      return { ...state, isLoading: action.isLoading, items: action.items };
    case FAIL:
      return { ...state, failed: true, isLoading: action.isLoading };
    default:
      return { ...state };
  }
}

export const getPhotos = state => state.photos.items;
export const getFailed = state => state.photos.failed;
export const getIsLoading = state => state.photos.isLoading;
export const getThumbnails = state =>
  Object.values(getPhotos(state)).reduce(
    (acc, photo) =>
      acc[photo.albumId]
        ? { ...acc }
        : { ...acc, [photo.albumId]: photo.thumbnailUrl },
    {},
  );

export const loading = () => ({ type: LOAD, isLoading: true });

export const success = items => ({ type: SUCCESS, isLoading: false, items });

export const fail = () => ({ type: FAIL, isLoading: false });

export const fetchPhotos = options => async dispatch => {
  dispatch(loading());
  try {
    const photos = await apiGetPhotos(options);
    const normalizedData = normalize(photos, photoList);
    dispatch(success(normalizedData.entities.photos));
  } catch (err) {
    dispatch(fail());
  }
};
