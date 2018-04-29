import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './store';
import Home from './Home';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </ConnectedRouter>
  </Provider>
);

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('app'));
