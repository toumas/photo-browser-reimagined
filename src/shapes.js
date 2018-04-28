import PropTypes from 'prop-types';
// eslint-disable-next-line import/prefer-default-export
export const photoShape = {
  albumId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
