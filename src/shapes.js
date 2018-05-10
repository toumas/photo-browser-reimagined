import PropTypes from 'prop-types';
// eslint-disable-next-line import/prefer-default-export
export const photoShape = {
  albumId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export const photoShapeOptional = {
  album: PropTypes.number,
  albumId: PropTypes.number,
  id: PropTypes.number,
  thumbnailUrl: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};

export const paramsShape = {
  page: PropTypes.string,
};

export const matchShape = {
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.shape(paramsShape),
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export const albumShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};
