import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { match } from 'react-router';
import { push } from 'react-router-redux';

import { ApplicationState } from '../../reducers';
import { FetchOptions, Photo, PhotosProps } from '../../typings';
import {
  fetchPhotos,
  getFailed,
  getIsLoading,
  getPhotos,
  getTotalCount,
} from './Duck';

interface Props {
  match: match<{}>;
  children(props: PhotosProps): JSX.Element;
}

interface PropsFromState {
  failed: boolean;
  isLoading: boolean;
  photos: Photo[];
  totalCount: number;
  navigate(page: number): void;
}

interface PropsFromDispatch {
  fetchPhotos(options: FetchOptions): DispatchProp;
}

type PhotosContainerProps = PropsFromState & PropsFromDispatch;

function getPath(currentPath: string, currentPage: string, id: number): string {
  if (currentPath === '/') {
    return `/page/${currentPage}/photo/${id}`;
  }
  return `${currentPath}/photo/${id}`;
}

export class PhotosContainer extends Component<PhotosContainerProps & Props> {
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

  getPath = (id: number) =>
    getPath(this.props.match.url, this.state.options.page, id);

  fetchPhotos = () => {
    this.props.fetchPhotos(this.state.options);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.props.navigate(activePage);
  };

  render() {
    const { children, failed, isLoading, photos, totalCount } = this.props;
    const {
      options: { page: activePage, limit },
    } = this.state;

    return children({
      failed,
      isLoading,
      photos,
      // tslint:disable-next-line
      getPath: this.getPath,
      retry: this.fetchPhotos,
      handlePaginationChange: this.handlePaginationChange,
      paginationOptions: {
        activePage,
        totalPages: Math.ceil(totalCount / parseInt(limit, 10)),
      },
    });
  }
}

export const mapStateToProps = (state: ApplicationState) => ({
  failed: getFailed(state),
  isLoading: getIsLoading(state),
  photos: Object.values(getPhotos(state)),
  totalCount: getTotalCount(state),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPhotos: (options: FetchOptions) => dispatch(fetchPhotos(options)),
  navigate: (page) => dispatch(push(`/page/${page}`)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotosContainer);
