import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
      options: { ...prevState.options, page: 1 },
    };
  }

  state = {
    options: {
      page: 1,
      limit: 10,
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

  fetchPhotos = () => {
    this.props.fetchPhotos(this.state.options);
  };

  goToPhoto = id => () => {
    this.props.goToPhoto(this.props.match.url, this.state.options.page, id);
  };

  render() {
    const { children, failed, isLoading, photos } = this.props;

    return children({
      failed,
      isLoading,
      photos,
      retry: this.fetchPhotos,
      handleClick: this.goToPhoto,
    });
  }
}

PhotosContainer.propTypes = {
  children: PropTypes.func.isRequired,
  failed: PropTypes.bool.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  goToPhoto: PropTypes.func.isRequired,
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
  goToPhoto: (currentPath, currentPage, id) => {
    if (currentPath === '/') {
      dispatch(push(`/page/${currentPage}/photo/${id}`));
    } else {
      dispatch(push(`${currentPath}/photo/${id}`));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosContainer);
