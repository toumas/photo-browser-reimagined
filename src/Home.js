import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import PhotosContainer from './PhotosContainer';
import PhotoList from './PhotoList';
import PhotoContainer from './PhotoContainer';
import { matchShape } from './shapes';
import Photo from './photo';

const Home = ({ match }) => (
  <PhotosContainer match={match}>
    {props => (
      <React.Fragment>
        <PhotoList {...props} />
        <Route
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

Home.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default Home;
