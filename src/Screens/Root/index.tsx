import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

import PhotosContainer from '../../components/Photos/PhotosContainer';
import PhotoList from '../../components/UI/PhotoList';
import { PhotosProps } from '../../typings';
import ScreensPhoto from '../Photo/Photo';

const ScreensRoot: SFC<RouteComponentProps<{}>> = (props) => (
  <PhotosContainer match={props.match}>
    {renderPhotoList(props)}
  </PhotosContainer>
);

function renderPhotoList(
  props: RouteComponentProps<{}>,
): (photosProps) => JSX.Element {
  const { match } = props;
  return (photosProps: PhotosProps): JSX.Element => (
    <React.Fragment>
      <PhotoList {...photosProps} />
      <Route
        exact={true}
        path={`${match.url}/photo/:id`}
        component={ScreensPhoto}
      />
    </React.Fragment>
  );
}

export default ScreensRoot;
