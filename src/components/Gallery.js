import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import PhotosContainer from '../containers/PhotosContainer';
import PhotoList from './PhotoList';
import PhotoContainer from '../containers/PhotoContainer';
import { matchShape } from '../shapes';
import Photo from './Photo';

const Gallery = ({ match }) => (
  <PhotosContainer match={match}>
    {props => (
      <React.Fragment>
        <PhotoList {...props} />
        <Route
          exact
          path={`${match.url}/photo/:id`}
          render={({ match: photoMatch }) => (
            <React.Fragment>
              <PhotoContainer match={photoMatch}>
                {photoProps => <Photo {...photoProps} />}
              </PhotoContainer>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    )}
  </PhotosContainer>
);

Gallery.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default Gallery;
