import React from 'react';
import { Link } from 'react-router-dom';
import PhotoList from './PhotoList';
import Retry from './Retry';

/* eslint-disable no-undef */

describe('PhotoList component', () => {
  it('renders loading text when isLoading prop equals true', () => {
    const props = {
      isLoading: true,
      failed: false,
      getPath: () => {},
      items: [],
      retry: () => {},
    };
    const wrapper = shallow(<PhotoList {...props} />);
    expect(wrapper.text()).toEqual('Loading...');
  });

  it('renders retry component when failed prop equals true', () => {
    const props = {
      isLoading: false,
      failed: true,
      getPath: () => {},
      items: [],
      retry: () => {},
    };
    const wrapper = shallow(<PhotoList {...props} />);
    expect(
      wrapper.containsMatchingElement(
        <Retry text="Failed to load content" handleClick={props.retry} />,
      ),
    ).toEqual(true);
  });

  it('renders thumbnails when props isLoading and failed equal false', () => {
    const props = {
      children: () => {},
      isLoading: false,
      failed: false,
      getPath: () => '/',
      items: [
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'http://placehold.it/600/92c952',
          thumbnailUrl: 'http://placehold.it/150/92c952',
        },
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'http://placehold.it/600/771796',
          thumbnailUrl: 'http://placehold.it/150/771796',
        },
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'http://placehold.it/600/771796',
          thumbnailUrl: 'http://placehold.it/150/771796',
        },
      ],
      retry: () => {},
    };
    const wrapper = shallow(<PhotoList {...props} />);
    expect(
      wrapper
        .find('div')
        .first()
        .children(),
    ).toHaveLength(props.items.length);
    expect(
      wrapper
        .find('div')
        .first()
        .children()
        .first()
        .containsMatchingElement(
          <React.Fragment key={props.items[0].id}>
            <Link to={props.getPath(props.items[0].id)}>
              <img
                src={props.items[0].thumbnailUrl}
                alt={props.items[0].title}
              />
            </Link>
            {props.children(props.items[0])}
          </React.Fragment>,
        ),
    ).toEqual(true);
  });
});
