import React, { SFC } from 'react';
import { match as IMatch } from 'react-router';

import AlbumsContainer from '../../../components/Albums/Container';
import PhotoList from '../../../components/UI/PhotoList';
import { AlbumsProps } from '../../../typings';

interface Props {
  match: IMatch<{}>;
}

const ScreensAlbumsPage: SFC<Props> = ({ match }) => (
  <AlbumsContainer match={match}>
    {(props: AlbumsProps) => (
      <PhotoList {...props}>{(photo) => <span>{photo.title}</span>}</PhotoList>
    )}
  </AlbumsContainer>
);

export default ScreensAlbumsPage;
