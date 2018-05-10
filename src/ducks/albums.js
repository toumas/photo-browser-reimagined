import { normalize } from 'normalizr';
import { getAlbums as apiGetAlbums } from '../api';
import { albumList } from '../schemas';

const LOADING = 'APP/ALBUMS/LOADING';
const SUCCESS = 'APP/ALBUMS/SUCCESS';
const FAIL = 'APP/ALBUMS/FAILED';

export default function reducer(
  state = { failed: false, isLoading: false, items: {} },
  action = {},
) {
  switch (action.type) {
    case LOADING:
      return { ...state, failed: false, isLoading: action.isLoading };
    case SUCCESS:
      return { ...state, isLoading: action.isLoading, items: action.items };
    case FAIL:
      return { ...state, failed: true, isLoading: action.isLoading };
    default:
      return { ...state };
  }
}

export const getAlbums = state => state.albums.items;
export const getFailed = state => state.albums.failed;
export const getIsLoading = state => state.albums.isLoading;

export const loading = () => ({ type: LOADING, isLoading: true });

export const success = items => ({ type: SUCCESS, isLoading: false, items });

export const fail = () => ({ type: FAIL, isLoading: false });

export const fetchAlbums = options => async dispatch => {
  dispatch(loading());
  try {
    const albums = await apiGetAlbums(options);
    const normalizedData = normalize(albums, albumList);
    dispatch(success(normalizedData.entities.albums));
  } catch (err) {
    dispatch(fail());
  }
};
