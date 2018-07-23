import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { match } from 'react-router';

import { Photo, PhotoContainerMatchParams } from '../../typings';
import { fetchPhoto, getFailed, getIsLoading, getPhoto } from './Duck';

interface Props {
  failed: boolean;
  isLoading: boolean;
  photo: Photo;
  match: match<PhotoContainerMatchParams>;
  fetchPhoto(id: string): DispatchProp;
  children(props): JSX.Element;
}

export class PhotoContainer extends Component<Props> {
  componentDidMount() {
    this.props.fetchPhoto(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchPhoto(this.props.match.params.id);
    }
  }

  render() {
    const {
      failed,
      fetchPhoto: retry,
      isLoading,
      photo,
      children,
    } = this.props;

    return children({ failed, isLoading, photo, retry });
  }
}

export const mapStateToProps = (state) => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photo: getPhoto(state),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPhoto: (id) => dispatch(fetchPhoto(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoContainer);
