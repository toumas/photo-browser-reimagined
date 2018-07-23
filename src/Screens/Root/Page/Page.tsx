import React from 'react';
import PropTypes from 'prop-types';
import ScreensRoot from '../index';
import { matchShape } from '../../../shapes';

const ScreensRootPage = ({ match }) => <ScreensRoot match={match} />;

ScreensRootPage.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default ScreensRootPage;
