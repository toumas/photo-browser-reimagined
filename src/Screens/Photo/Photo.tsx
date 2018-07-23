import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';

import PhotoContainer from '../../components/Photo/Container';
import Photo from '../../components/Photo/Photo';
import { PhotoContainerMatchParams } from '../../typings';

const ScreensPhoto: SFC<RouteComponentProps<PhotoContainerMatchParams>> = ({
  match,
}) => (
  <PhotoContainer match={match}>
    {(props) => <Photo {...props} />}
  </PhotoContainer>
);

export default ScreensPhoto;
