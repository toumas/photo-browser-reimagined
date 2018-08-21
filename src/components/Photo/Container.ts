import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';

import { ApplicationState } from '../../reducers';
import { Photo } from '../../typings';
import { fetchPhoto, getFailed, getIsLoading, getPhoto } from './Duck';

interface Props extends RouteComponentProps<{ id: string }> {
  children(props): JSX.Element;
}

interface PropsFromState {
  failed: boolean;
  isLoading: boolean;
  photo: Photo;
  navigate(url: string): void;
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

  handleDimmerClick = () => {
    const {
      location: { state },
      navigate,
    } = this.props;
    if (state && state.parentPath) {
      navigate(this.props.location.state.parentPath);
    } else {
      const pathname: string[] = window.location.pathname.split('/');
      navigate(pathname.slice(0, pathname.length - 2).join('/'));
    }
  };

  render() {
    const {
      failed,
      fetchPhoto: retry,
      isLoading,
      photo,
      children,
    } = this.props;

    return children({
      failed,
      isLoading,
      photo,
      retry,
      // tslint:disable-next-line
      onDimmerClick: this.handleDimmerClick,
    });
  }
}

export const mapStateToProps = (state: ApplicationState) => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photo: getPhoto(state),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPhoto: (id: string) => dispatch(fetchPhoto(id)),
  navigate: (url: string) => dispatch(push(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoContainer);
