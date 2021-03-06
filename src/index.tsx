import 'babel-polyfill';
// tslint:disable-next-line
import 'semantic-ui-css/semantic.min.css';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Screens from './Screens';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <Screens />
  </Provider>
);

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('app'));
