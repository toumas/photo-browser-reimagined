import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photos from './photos';
import photo from './photo/photo';

export default combineReducers({
  photo,
  photos,
  router: routerReducer,
});
