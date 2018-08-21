import * as React from 'react';
import { Image, Modal } from 'semantic-ui-react';

import { Photo, PhotoProps } from '../../typings';
import Retry from '../UI/Retry';

const Photo: React.SFC<PhotoProps> = (props: PhotoProps) => {
  if (props.isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }
  if (props.failed) {
    return <Retry text="Failed to load photo" handleClick={props.retry} />;
  }
  return (
    <Modal
      basic={true}
      defaultOpen={true}
      size="tiny"
      onClose={props.onDimmerClick}
      trigger={null}
    >
      <Image src={props.photo.url} alt={props.photo.title} centered={true} />
    </Modal>
  );
};

export default Photo;
