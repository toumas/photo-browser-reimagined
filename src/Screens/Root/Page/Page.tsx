import React, { SFC } from 'react';
import { match as IMatch } from 'react-router';

import ScreensRoot from '../';

interface Props {
  match: IMatch<{}>;
}

const ScreensRootPage: SFC<Props> = ({ match }) => (
  <ScreensRoot match={match} />
);

export default ScreensRootPage;
