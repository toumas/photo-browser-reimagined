import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPhotos } from './photos';
import { photoShape } from './shapes';

class PhotosContainer extends Component {
  componentDidMount() {
    this.props.fetchPhotos();
  }

  fetchPhotos = () => {
    this.props.fetchPhotos();
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
  fetchPhotos: () => dispatch(fetchPhotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosContainer);
