import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();
const routerHistoryMiddleware = routerMiddleware(history);

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, routerHistoryMiddleware)),
);
