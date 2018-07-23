import * as React from 'react';
import { DispatchProp } from 'react-redux';

import { Photo } from '../../typings';
import Retry from '../UI/Retry';

interface Props {
  failed: boolean;
  isLoading: boolean;
  photo: Photo;
  retry(): DispatchProp;
}

const Photo: React.SFC<Props> = ({ failed, isLoading, photo, retry }) => {
  if (isLoading) {
    return 'Loading...';
  }
  if (failed) {
    return <Retry text="Failed to load photo" handleClick={retry} />;
  }
  return <img src={photo.url} alt={photo.title} />;
};

export default Photo;
