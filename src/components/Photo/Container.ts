import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { match } from 'react-router';

import { ApplicationState } from '../../reducers';
import { Photo, PhotoContainerMatchParams } from '../../typings';
import { fetchPhoto, getFailed, getIsLoading, getPhoto } from './Duck';

interface Props {
  match: match<PhotoContainerMatchParams>;
  children(props): JSX.Element;
}

interface PropsFromState {
  failed: boolean;
  isLoading: boolean;
  photo: Photo;
}

interface PropsFromDispatch {
  fetchPhoto(id: string): DispatchProp;
}

type PhotoContainerProps = PropsFromState & PropsFromDispatch;

export class PhotoContainer extends Component<PhotoContainerProps & Props> {
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

export const mapStateToProps = (state: ApplicationState) => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photo: getPhoto(state),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPhoto: (id: string) => dispatch(fetchPhoto(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoContainer);
