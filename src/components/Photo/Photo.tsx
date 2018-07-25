import * as React from 'react';

import { Photo, PhotoProps } from '../../typings';
import Retry from '../UI/Retry';

const Photo: React.SFC<PhotoProps> = (props: PhotoProps) => {
  if (props.isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }
  if (props.failed) {
    return <Retry text="Failed to load photo" handleClick={props.retry} />;
  }
  return <img src={props.photo.url} alt={props.photo.title} />;
};

export default Photo;
