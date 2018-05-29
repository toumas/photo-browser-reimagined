import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchPhotos,
  getFailed,
  getIsLoading,
  getPhotos,
} from '../ducks/photos';
import { photoShape, matchShape } from '../shapes';

class PhotosContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { page, id } = nextProps.match.params;

    if (Object.keys(nextProps.match.params).length > 0) {
      let options = {};

      if (typeof page !== 'undefined') {
        options = { ...options, page };
      }
      if (typeof id !== 'undefined') {
        options = { ...options, albumId: id };
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
    this.props.fetchPhotos(this.state.options);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.options.page !== prevState.options.page) {
      this.props.fetchPhotos(this.state.options);
    }
  }

  getPath = id =>
    this.props.getPath(this.props.match.url, this.state.options.page, id);

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
  getPath: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape(matchShape).isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape(photoShape)).isRequired,
};

const mapStateToProps = state => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photos: Object.values(getPhotos(state)),
});

const mapDispatchToProps = dispatch => ({
  fetchPhotos: options => dispatch(fetchPhotos(options)),
  getPath: (currentPath, currentPage, id) => {
    if (currentPath === '/') {
      return `/page/${currentPage}/photo/${id}`;
    }
    return `${currentPath}/photo/${id}`;
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosContainer);
