import { Location } from 'history';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Header, Icon, Menu, Responsive } from 'semantic-ui-react';

const Sidebar: React.SFC<{ location: Location }> = () => (
  <Responsive
    minWidth={992}
    as={Menu}
    icon="labeled"
    vertical={true}
    fluid={true}
    style={{ height: '100vh' }}
  >
    <Menu.Item header={true} position="left" style={{ textAlign: 'left' }}>
      <Header as="h1">
        <Link to="/">Photo Browser</Link>
      </Header>
    </Menu.Item>
    <Menu.Item name="photos" link={true} exact={true} as={NavLink} to="/">
      <Header as="h2">
        <Icon name="picture" />
        <Header.Content>Photos</Header.Content>
      </Header>
    </Menu.Item>
    <Menu.Item name="albums" link={true} as={NavLink} to="/albums">
      <Header as="h2">
        <Icon name="images" />
        <Header.Content>Albums</Header.Content>
      </Header>
    </Menu.Item>
  </Responsive>
);

export default Sidebar;
