import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from '../store';
import ScreensRoot from './Root/Root';
import ScreensRootPage from './Root/Page/Page';
import ScreensPhoto from './Photo/Photo';
import ScreensAlbums from './Albums/Root';
import ScreensAlbumsPage from './Albums/Page/Page';
import ScreensAlbumsAlbumPage from './Albums/Album/Page/Page';

const Screens = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={ScreensRoot} />
      <Route path="/page/:page" component={ScreensRootPage} />
      <Route exact path="/photo/:id" component={ScreensPhoto} />
      <Route exact path="/albums" component={ScreensAlbums} />
      <Route exact path="/albums/page/:page" component={ScreensAlbumsPage} />
      <Route
        path="/albums/:albumId/page/:page"
        component={ScreensAlbumsAlbumPage}
      />
    </Switch>
  </ConnectedRouter>
);

export default Screens;
