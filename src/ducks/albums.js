import { normalize } from 'normalizr';
import { getAlbums as apiGetAlbums, getPhotos } from '../api';
import { albumList, photoList } from '../schemas';
import {
  success as photosSuccess,
  loading as photosLoading,
  fail as photosFail,
  getThumbnails,
} from './photos';

export const LOAD = 'app/albums/LOAD';
export const SUCCESS = 'app/albums/SUCCESS';
export const FAIL = 'app/albums/FAILED';

export default function reducer(
  state = { failed: false, isLoading: false, items: {} },
  action = {},
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

export const getFailed = state => state.albums.failed;
export const getIsLoading = state => state.albums.isLoading;
export const getAlbums = state => {
  if (getIsLoading(state)) {
    return {};
  }
  const thumbnails = getThumbnails(state);
  return Object.entries(thumbnails).reduce(
    (acc, entry) => ({
      ...acc,
      [entry[0]]: { ...state.albums.items[entry[0]], thumbnailUrl: entry[1] },
    }),
    {},
  );
};

export const loading = () => ({ type: LOAD, isLoading: true });

export const success = items => ({ type: SUCCESS, isLoading: false, items });

export const fail = () => ({ type: FAIL, isLoading: false });

export const fetchAlbums = options => async dispatch => {
  dispatch(loading());
  try {
    const albums = await apiGetAlbums(options);
    const normalizedData = normalize(albums, albumList);
    dispatch(photosLoading());
    try {
      const photos = await Promise.all(
        normalizedData.result.map(albumId => getPhotos({ albumId, limit: 1 })),
      );
      const normalizedPhotos = normalize(photos, [photoList]);
      dispatch(photosSuccess(normalizedPhotos.entities.photos));
    } catch (err) {
      dispatch(photosFail());
    }

    dispatch(success(normalizedData.entities.albums));
  } catch (err) {
    dispatch(fail());
  }
};
