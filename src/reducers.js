import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photos from './ducks/photos';
import photo from './ducks/photo';

export default combineReducers({
  photo,
  photos,
  router: routerReducer,
});
