import React, { SFC } from 'react';
import { match } from 'react-router';
import { Route } from 'react-router-dom';

import PhotosContainer from '../../components/Photos/Container';
import PhotoList from '../../components/UI/PhotoList';
import { PhotosProps } from '../../typings';
import ScreensPhoto from '../Photo/Photo';

interface Props {
  match: match<{}>;
}

const ScreensRoot: SFC<Props> = (props: Props) => (
  <PhotosContainer match={props.match}>
    {renderPhotoList(props)}
  </PhotosContainer>
);

function renderPhotoList(props: Props): (photosProps) => JSX.Element {
  return (photosProps: PhotosProps): JSX.Element => (
    <React.Fragment>
      <PhotoList {...photosProps} />
      <Route
        exact={true}
        path={`${props.match.url}/photo/:id`}
        component={ScreensPhoto}
      />
    </React.Fragment>
  );
}

export default ScreensRoot;
