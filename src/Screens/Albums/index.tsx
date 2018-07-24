import React, { SFC } from 'react';
import { match as IMatch } from 'react-router';

import AlbumsContainer from '../../components/Albums/Container';
import PhotoList from '../../components/UI/PhotoList';
import { AlbumsProps, Photo } from '../../typings';

interface Props {
  match: IMatch<{}>;
}

const ScreensAlbums: SFC<Props> = ({ match }) => (
  <AlbumsContainer match={match}>
    {(props: AlbumsProps) => (
      <PhotoList {...props}>
        {(photo: Photo) => <span>{photo.title}</span>}
      </PhotoList>
    )}
  </AlbumsContainer>
);

export default ScreensAlbums;
