import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchAlbums,
  getFailed,
  getIsLoading,
  getAlbums,
} from '../ducks/albums';
import { albumShape } from '../shapes';

class AlbumsContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { page } = nextProps.match.params;

    if (Object.keys(nextProps.match.params).length > 0) {
      let options = {};

      if (typeof page !== 'undefined') {
        options = { ...options, page };
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
    this.props.fetchAlbums(this.state.options);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.options.page !== prevState.options.page) {
      this.props.fetchAlbums(this.state.options);
    }
  }

  fetchAlbums = () => {
    this.props.fetchAlbums(this.state.options);
  };

  render() {
    const { albums, children, failed, isLoading } = this.props;

    return children({
      albums,
      children,
      failed,
      isLoading,
      retry: this.fetchAlbums,
    });
  }
}

AlbumsContainer.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape(albumShape)).isRequired,
  children: PropTypes.func.isRequired,
  failed: PropTypes.bool.isRequired,
  fetchAlbums: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  albums: Object.values(getAlbums(state)),
});

const mapDispatchToProps = dispatch => ({
  fetchAlbums: options => dispatch(fetchAlbums(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);
