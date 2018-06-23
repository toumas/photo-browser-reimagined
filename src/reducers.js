import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photos from './components/Photos/Duck';
import photo from './components/Photo/Duck';
import albums from './components/Albums/Duck';

export default combineReducers({
  albums,
  photo,
  photos,
  router: routerReducer,
});
