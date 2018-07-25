import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { match } from 'react-router';

import { FetchOptions, Photo, PhotosProps } from '../../typings';
import { fetchPhotos, getFailed, getIsLoading, getPhotos } from './Duck';

interface Props {
  failed: boolean;
  isLoading: boolean;
  photos: Photo[];
  match: match<{}>;
  children(props: PhotosProps): JSX.Element;
  fetchPhotos(options: FetchOptions): DispatchProp;
}

function getPath(currentPath: string, currentPage: string, id: string): string {
  if (currentPath === '/') {
    return `/page/${currentPage}/photo/${id}`;
  }
  return `${currentPath}/photo/${id}`;
}

export class PhotosContainer extends Component<Props> {
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
      limit: '10',
      page: '1',
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

  getPath = (id: string) =>
    getPath(this.props.match.url, this.state.options.page, id);

  fetchPhotos = () => {
    this.props.fetchPhotos(this.state.options);
  };

  render() {
    const { children, failed, isLoading, photos } = this.props;

    return children({
      failed,
      isLoading,
      photos,
      // tslint:disable-next-line
      getPath: this.getPath,
      retry: this.fetchPhotos,
    });
  }
}

export const mapStateToProps = (state) => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photos: Object.values(getPhotos(state)),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPhotos: (options: FetchOptions) => dispatch(fetchPhotos(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotosContainer);
