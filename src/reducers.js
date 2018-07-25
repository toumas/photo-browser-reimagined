import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photos from './components/Photos/Duck.ts';
import photo from './components/Photo/Duck.ts';
import albums from './components/Albums/Duck.ts';

export default combineReducers({
  albums,
  photo,
  photos,
  router: routerReducer,
});
