import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photos from './ducks/photos';
import photo from './ducks/photo';
import albums from './ducks/albums';

export default combineReducers({
  albums,
  photo,
  photos,
  router: routerReducer,
});
