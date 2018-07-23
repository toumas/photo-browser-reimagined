import * as React from 'react';
import { Link } from 'react-router-dom';

import { Photo, PhotoList } from '../../typings';
import Retry from '../UI/Retry';

const PhotoList: React.SFC<PhotoList> = (props) => {
  const { isLoading, failed, retry, items: photos, children, getPath } = props;
  if (isLoading) {
    return 'Loading...';
  }
  if (failed) {
    return <Retry text="Failed to load content" handleClick={retry} />;
  }
  return <div>{renderPhotos(photos, getPath, children)}</div>;
};

export function renderPhotos(
  photos: Photo[],
  getPath: (id: number) => string,
  children: (photo: Photo) => any,
): JSX.Element[] {
  return photos.map(
    (photo: Photo): JSX.Element => (
      <div
        className="thumbnail"
        style={{ display: 'inline-block' }}
        key={photo.id}
      >
        <Link to={getPath(photo.id)}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
        </Link>
        {children(photo)}
      </div>
    ),
  );
}

export default PhotoList;
