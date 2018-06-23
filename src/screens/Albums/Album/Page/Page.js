import React from 'react';
import PropTypes from 'prop-types';
import ScreensRootPage from '../../../Root/Page/Page';
import { matchShape } from '../../../../shapes';

const ScreensAlbumsAlbumPage = ({ match }) => <ScreensRootPage match={match} />;

ScreensAlbumsAlbumPage.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default ScreensAlbumsAlbumPage;
