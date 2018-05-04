import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './store';
import Home from './Home';
import PhotoContainer from './PhotoContainer';
import Photo from './photo';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page/:page" render={props => <Home {...props} />} />
        <Route
          path="/photo/:id"
          render={({ match }) => (
            <PhotoContainer match={match}>
              {props => <Photo {...props} />}
            </PhotoContainer>
          )}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('app'));
