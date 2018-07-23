import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from '../store';
import ScreensAlbums from './Albums';
import ScreensAlbumsAlbumPage from './Albums/Album/Page/Page';
import ScreensAlbumsPage from './Albums/Page/Page';
import ScreensPhoto from './Photo/Photo';
import ScreensRoot from './Root';
import ScreensRootPage from './Root/Page/Page';

const Screens = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact={true} path="/" component={ScreensRoot} />
      <Route path="/page/:page" component={ScreensRootPage} />
      <Route exact={true} path="/photo/:id" component={ScreensPhoto} />
      <Route exact={true} path="/albums" component={ScreensAlbums} />
      <Route
        exact={true}
        path="/albums/page/:page"
        component={ScreensAlbumsPage}
      />
      <Route
        path="/albums/:albumId/page/:page"
        component={ScreensAlbumsAlbumPage}
      />
    </Switch>
  </ConnectedRouter>
);

export default Screens;
