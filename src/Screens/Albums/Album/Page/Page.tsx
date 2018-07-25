import React, { SFC } from 'react';
import { match as IMatch } from 'react-router';

import ScreensRootPage from '../../../Root/Page/Page';

interface Props {
  match: IMatch<{}>;
}

const ScreensAlbumsAlbumPage: SFC<Props> = ({ match }) => (
  <ScreensRootPage match={match} />
);

export default ScreensAlbumsAlbumPage;
