import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

const Sidebar: React.SFC<RouteComponentProps<{}>> = ({
  location: { state: { active = '' } = {} },
}) => (
  <Menu icon="labeled" fixed={'left'} vertical={true}>
    <Menu.Item
      name="photos"
      link={true}
      as={Link}
      to={{ pathname: '/', state: { active: 'photos' } }}
      active={active === 'photos'}
    >
      <Icon name="picture" />
      Photos
    </Menu.Item>
    <Menu.Item
      name="albums"
      link={true}
      as={Link}
      to={{ pathname: '/albums', state: { active: 'albums' } }}
      active={active === 'albums'}
    >
      <Icon name="images" />
      Albums
    </Menu.Item>
  </Menu>
);

export default withRouter(Sidebar);
