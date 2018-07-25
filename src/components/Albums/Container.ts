import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { match } from 'react-router';

import { ApplicationState } from '../../reducers';
import { AlbumThumbnail, FetchOptions, PhotosProps } from '../../typings';
import { fetchAlbums, getAlbums, getFailed, getIsLoading } from './Duck';

interface Props {
  match: match<{}>;
  children(props: PhotosProps): JSX.Element;
}

interface PropsFromState {
  albums: AlbumThumbnail[];
  failed: boolean;
  isLoading: boolean;
}

interface PropsFromDispatch {
  fetchAlbums(options: FetchOptions): DispatchProp;
}

type AlbumsContainerProps = PropsFromState & PropsFromDispatch;

function getPath(currentPath: string, currentPage: string, id: string): string {
  if (/^\/albums\/page\/[0-9]+$/.test(currentPath)) {
    return `/albums/${id}/page/1`;
  }
  return `${currentPath}/${id}/page/${currentPage}`;
}

export class AlbumsContainer extends Component<AlbumsContainerProps & Props> {
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
    this.fetchAlbums();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.options.page !== prevState.options.page) {
      this.fetchAlbums();
    }
  }

  getPath = (id: string) =>
    getPath(this.props.match.url, this.state.options.page, id);

  fetchAlbums = () => {
    this.props.fetchAlbums(this.state.options);
  };

  render() {
    const { albums: photos, children, failed, isLoading } = this.props;

    return children({
      failed,
      isLoading,
      photos,
      // tslint:disable-next-line
      getPath: this.getPath,
      retry: this.fetchAlbums,
    });
  }
}

export const mapStateToProps = (state: ApplicationState) => ({
  albums: Object.values(getAlbums(state)),
  failed: getFailed(state),
  isLoading: getIsLoading(state),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: (options: FetchOptions) => dispatch(fetchAlbums(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumsContainer);
