import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Container, Grid } from 'semantic-ui-react';

import CollapsibleMenu from '../components/UI/CollapsibleMenu';
import Sidebar from '../components/UI/Sidebar';
import { history } from '../store';
import ScreensAlbums from './Albums';
import ScreensAlbumsAlbumPage from './Albums/Album/Page/Page';
import ScreensAlbumsPage from './Albums/Page/Page';
import ScreensPhoto from './Photo/Photo';
import ScreensRoot from './Root';
import ScreensRootPage from './Root/Page/Page';

const Screens = (props) => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <CollapsibleMenu location={history.location} />
      <Grid padded={true}>
        <Grid.Column
          stretched={true}
          only="computer"
          width={3}
          style={{ padding: 0 }}
        >
          <Sidebar location={history.location} />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={13}>
          <Container fluid={true} style={{ marginTop: '14px' }}>
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
          </Container>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  </ConnectedRouter>
);

export default Screens;
