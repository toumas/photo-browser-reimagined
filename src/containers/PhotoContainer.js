import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPhoto, getPhoto, getFailed, getIsLoading } from '../ducks/photo';
import { matchShape, photoShapeOptional } from '../shapes';

export class PhotoContainer extends Component {
  componentDidMount() {
    this.props.fetchPhoto(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchPhoto(this.props.match.params.id);
    }
  }

  render() {
    const { failed, fetchPhoto: retry, isLoading, photo } = this.props;

    return this.props.children({ failed, isLoading, photo, retry });
  }
}

const mapStateToProps = state => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photo: getPhoto(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPhoto: id => dispatch(fetchPhoto(id)),
});

PhotoContainer.propTypes = {
  children: PropTypes.func.isRequired,
  failed: PropTypes.bool.isRequired,
  fetchPhoto: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape(matchShape).isRequired,
  photo: PropTypes.shape(photoShapeOptional).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
