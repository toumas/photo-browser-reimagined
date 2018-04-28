import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('app'));
