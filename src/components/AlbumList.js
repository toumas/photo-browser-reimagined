import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { albumShape } from '../shapes';

const AlbumList = ({ isLoading, failed, albums, retry }) => {
  if (isLoading) {
    return 'Loading...';
  } else if (failed) {
    return (
      <div>
        <span>Failed to load albums</span>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }
  return (
    <div>
      {albums.map(album => (
        <div key={album.id}>
          <Link to={`/albums/${album.id}/page/1`}>{album.title}</Link>
        </div>
      ))}
    </div>
  );
};

AlbumList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
  albums: PropTypes.arrayOf(PropTypes.shape(albumShape)).isRequired,
};

export default AlbumList;
