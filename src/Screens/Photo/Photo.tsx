import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';

import PhotoContainer from '../../components/Photo/Container';
import Photo from '../../components/Photo/Photo';
import { PhotoContainerMatchParams, PhotoProps } from '../../typings';

const ScreensPhoto: SFC<RouteComponentProps<PhotoContainerMatchParams>> = (
  routeProps,
) => (
  <PhotoContainer {...routeProps}>
    {(props: PhotoProps) => <Photo {...props} />}
  </PhotoContainer>
);

export default ScreensPhoto;
