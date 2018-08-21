import React, { SFC } from 'react';
import { match as IMatch } from 'react-router';
import { Header } from 'semantic-ui-react';

import AlbumsContainer from '../../../components/Albums/Container';
import PhotoList from '../../../components/UI/PhotoList';
import { AlbumsProps } from '../../../typings';

interface Props {
  match: IMatch<{}>;
}

const ScreensAlbumsPage: SFC<Props> = ({ match }) => (
  <AlbumsContainer match={match}>
    {(props: AlbumsProps) => (
      <PhotoList {...props}>
        {(photo) => (
          <Header as="h3" size="tiny" style={{ margin: '0' }}>
            {photo.title}
          </Header>
        )}
      </PhotoList>
    )}
  </AlbumsContainer>
);

export default ScreensAlbumsPage;
