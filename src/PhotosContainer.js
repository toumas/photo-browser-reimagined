import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPhotos } from './photos';
import { photoShape } from './shapes';

class PhotosContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.params.page !== prevState.options.page) {
      return {
        ...prevState,
        options: { ...prevState.options, page: nextProps.params.page },
      };
    }
    return null;
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

  render() {
    const { children, failed, isLoading, photos } = this.props;

    return children({ failed, isLoading, photos, retry: this.fetchPhotos });
  }
}

PhotosContainer.propTypes = {
  children: PropTypes.func.isRequired,
  failed: PropTypes.bool.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape(photoShape)).isRequired,
};

const mapStateToProps = state => ({
  failed: state.photos.failed,
  isLoading: state.photos.isLoading,
  photos: Object.values(state.photos.items),
});

const mapDispatchToProps = dispatch => ({
  fetchPhotos: options => dispatch(fetchPhotos(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosContainer);
