import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { match } from 'react-router';
import { push } from 'react-router-redux';

import { ApplicationState } from '../../reducers';
import { AlbumThumbnail, FetchOptions, PhotosProps } from '../../typings';
import {
  fetchAlbums,
  getAlbums,
  getFailed,
  getIsLoading,
  getTotalCount,
} from './Duck';

interface Props {
  match: match<{}>;
  children(props: PhotosProps): JSX.Element;
}

interface PropsFromState {
  albums: AlbumThumbnail[];
  failed: boolean;
  isLoading: boolean;
  totalCount: number;
  navigate(page: number): void;
}

interface PropsFromDispatch {
  fetchAlbums(options: FetchOptions): DispatchProp;
}

type AlbumsContainerProps = PropsFromState & PropsFromDispatch;

function getPath(currentPath: string, currentPage: string, id: number): string {
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
      limit: '15',
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

  getPath = (id: number) =>
    getPath(this.props.match.url, this.state.options.page, id);

  fetchAlbums = () => {
    this.props.fetchAlbums(this.state.options);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.props.navigate(activePage);
  };

  render() {
    const {
      albums: photos,
      children,
      failed,
      isLoading,
      totalCount,
    } = this.props;
    const {
      options: { page: activePage, limit },
    } = this.state;

    return children({
      failed,
      isLoading,
      photos,
      // tslint:disable-next-line
      getPath: this.getPath,
      retry: this.fetchAlbums,
      handlePaginationChange: this.handlePaginationChange,
      paginationOptions: {
        activePage,
        totalPages: Math.ceil(totalCount / parseInt(limit, 10)),
      },
    });
  }
}

export const mapStateToProps = (state: ApplicationState) => ({
  albums: Object.values(getAlbums(state)),
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  totalCount: getTotalCount(state),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: (options: FetchOptions) => dispatch(fetchAlbums(options)),
  navigate: (page: number) => dispatch(push(`/albums/page/${page}`)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumsContainer);
