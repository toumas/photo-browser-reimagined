import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';

import ScreensRoot from '..';

const ScreensRootPage: SFC<RouteComponentProps<{}>> = ({ match }) => (
  <ScreensRoot match={match} />
);

export default ScreensRootPage;
