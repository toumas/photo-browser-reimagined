import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { itemShape } from '../shapes';

const PhotoList = ({ isLoading, failed, items, retry, children, getPath }) => {
  if (isLoading) {
    return 'Loading...';
  } else if (failed) {
    return (
      <div>
        <span>Failed to load content</span>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }
  return (
    <div>
      {items.map(item => (
        <React.Fragment key={item.id}>
          <Link to={getPath(item.id)}>
            <img src={item.thumbnailUrl} alt={item.title} />
          </Link>
          {children(item)}
        </React.Fragment>
      ))}
    </div>
  );
};

PhotoList.defaultProps = {
  children: () => null,
};

PhotoList.propTypes = {
  children: PropTypes.func,
  failed: PropTypes.bool.isRequired,
  getPath: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(itemShape)).isRequired,
  retry: PropTypes.func.isRequired,
};

export default PhotoList;
