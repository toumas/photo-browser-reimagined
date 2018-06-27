import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPhotos, getFailed, getIsLoading, getPhotos } from './Duck';
import { photoShape, matchShape } from '../../shapes';

function getPath(currentPath, currentPage, id) {
  if (currentPath === '/') {
    return `/page/${currentPage}/photo/${id}`;
  }
  return `${currentPath}/photo/${id}`;
}

export class PhotosContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { page, albumId } = nextProps.match.params;

    if (Object.keys(nextProps.match.params).length > 0) {
      let options = {};

      if (typeof page !== 'undefined') {
        options = { ...options, page };
      }
      if (typeof albumId !== 'undefined') {
        options = { ...options, albumId };
      }

      return {
        ...prevState,
        options: { ...prevState.options, ...options },
      };
    }

    return {
      ...prevState,
      options: { ...prevState.options, page: '1' },
    };
  }

  state = {
    options: {
      page: '1',
      limit: '10',
    },
  };

  componentDidMount() {
    this.fetchPhotos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.options.page !== prevState.options.page) {
      this.fetchPhotos();
    }
  }

  getPath = id => getPath(this.props.match.url, this.state.options.page, id);

  fetchPhotos = () => {
    this.props.fetchPhotos(this.state.options);
  };

  render() {
    const { children, failed, isLoading, photos: items } = this.props;

    return children({
      failed,
      isLoading,
      items,
      retry: this.fetchPhotos,
      getPath: this.getPath,
    });
  }
}

PhotosContainer.propTypes = {
  children: PropTypes.func.isRequired,
  failed: PropTypes.bool.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape(matchShape).isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape(photoShape)).isRequired,
};

export const mapStateToProps = state => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photos: Object.values(getPhotos(state)),
});

export const mapDispatchToProps = dispatch => ({
  fetchPhotos: options => dispatch(fetchPhotos(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotosContainer);