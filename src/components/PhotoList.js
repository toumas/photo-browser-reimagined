import React from 'react';
import PropTypes from 'prop-types';
import photoShape from '../shapes';

const PhotoList = ({ isLoading, failed, photos, retry, handleClick }) => {
  if (isLoading) {
    return 'Loading...';
  } else if (failed) {
    return (
      <div>
        <span>Failed to load photos</span>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }
  return (
    <div>
      {photos.map(photo => (
        <button key={photo.id} onClick={handleClick(photo.id)}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
        </button>
      ))}
    </div>
  );
};

PhotoList.propTypes = {
  failed: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape(photoShape)).isRequired,
  retry: PropTypes.func.isRequired,
};

export default PhotoList;
