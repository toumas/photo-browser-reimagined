import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhotosContainer from '../../components/Photos/PhotosContainer';
import PhotoList from '../../components/UI/PhotoList';
import ScreensPhoto from '../Photo/Photo';
import { matchShape } from '../../shapes';

const ScreensRoot = ({ match }) => (
  <PhotosContainer match={match}>
    {props => (
      <React.Fragment>
        <PhotoList {...props} />
        <Route
          exact
          path={`${match.url}/photo/:id`}
          render={({ match: photoMatch }) => (
            <ScreensPhoto match={photoMatch} />
          )}
        />
      </React.Fragment>
    )}
  </PhotosContainer>
);

ScreensRoot.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default ScreensRoot;
