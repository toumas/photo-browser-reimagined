import React from 'react';
import { PhotoContainer } from './PhotoContainer';

/* eslint-disable no-undef */

describe('PhotoContainer component', () => {
  it('renders its children', () => {
    const props = {
      match: {
        path: '/page/1/photo/:id',
        url: '/page/1/photo/1',
        isExact: true,
        params: {
          id: '1',
        },
      },
      failed: false,
      isLoading: false,
      photo: {},
      fetchPhoto: () => {},
    };
    const wrapper = shallow(
      <PhotoContainer {...props}>{() => <div>child</div>}</PhotoContainer>,
    );
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
