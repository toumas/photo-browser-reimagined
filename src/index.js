import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './store';
import Home from './components/Home';
import PhotoContainer from './containers/PhotoContainer';
import Photo from './components/Photo';
import AlbumsContainer from './containers/AlbumsContainer';
import AlbumList from './components/AlbumList';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page/:page" render={props => <Home {...props} />} />
        <Route
          exact
          path="/photo/:id"
          render={({ match }) => (
            <PhotoContainer match={match}>
              {props => <Photo {...props} />}
            </PhotoContainer>
          )}
        />
        <Route
          exact
          path="/albums"
          render={({ match }) => (
            <AlbumsContainer match={match}>
              {props => <AlbumList {...props} />}
            </AlbumsContainer>
          )}
        />
        <Route
          exact
          path="/albums/page/:page"
          render={({ match }) => (
            <AlbumsContainer match={match}>
              {props => <AlbumList {...props} />}
            </AlbumsContainer>
          )}
        />
        <Route
          path="/albums/:id/page/:page"
          render={({ match }) => <Home match={match} />}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('app'));
