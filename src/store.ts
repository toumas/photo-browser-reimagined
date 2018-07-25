import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history: History = createBrowserHistory();
const routerHistoryMiddleware = routerMiddleware(history);

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, routerHistoryMiddleware)),
);
