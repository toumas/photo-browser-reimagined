import { Location } from 'history';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Accordion,
  Grid,
  Header,
  Icon,
  Menu,
  Responsive,
} from 'semantic-ui-react';

class CollapsibleMenu extends React.Component<
  { location: Location },
  { activeIndex: number }
> {
  state = { activeIndex: -1 };

  handleClick = (index) => () => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const {
      location: { state: { active = '' } = {} },
    } = this.props;

    return (
      <Responsive maxWidth={991}>
        <Grid as={Menu}>
          <Grid.Row as={Menu.Item}>
            <Icon
              name={activeIndex === 0 ? 'times' : 'bars'}
              onClick={this.handleClick(0)}
              size="big"
            />
            <Menu.Header>
              <Header as="h1">Photo Browser</Header>
            </Menu.Header>
          </Grid.Row>
          {activeIndex === 0 && (
            <Grid.Column as={Menu.Item} width={16}>
              <Accordion fluid={true}>
                <Accordion.Title style={{ display: 'none' }} />
                <Accordion.Content active={activeIndex === 0}>
                  <Menu vertical={true} fluid={true}>
                    <Menu.Item
                      name="photos"
                      link={true}
                      exact={true}
                      as={NavLink}
                      to="/"
                    >
                      <Header as="h2">Photos</Header>
                    </Menu.Item>

                    <Menu.Item
                      name="albums"
                      link={true}
                      as={NavLink}
                      to="/albums"
                    >
                      <Header as="h2">Albums</Header>
                    </Menu.Item>
                  </Menu>
                </Accordion.Content>
              </Accordion>
            </Grid.Column>
          )}
        </Grid>
      </Responsive>
    );
  }
}

export default CollapsibleMenu;
