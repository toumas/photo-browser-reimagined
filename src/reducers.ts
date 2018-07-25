import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

import albums, { AlbumsState } from './components/Albums/Duck';
import photo, { PhotoState } from './components/Photo/Duck';
import photos, { PhotosState } from './components/Photos/Duck';

export interface ApplicationState {
  albums: AlbumsState;
  photo: PhotoState;
  photos: PhotosState;
  router: RouterState;
}

const reducers = combineReducers<ApplicationState>({
  albums,
  photo,
  photos,
  router: routerReducer,
});

export default reducers;
