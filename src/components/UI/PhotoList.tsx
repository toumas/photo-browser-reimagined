import * as React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Pagination, Responsive } from 'semantic-ui-react';

import { PaginationOptions, Photo, PhotoList } from '../../typings';
import Retry from './Retry';

const PhotoList: React.SFC<PhotoList> = (props) => {
  const {
    isLoading,
    failed,
    retry,
    photos,
    children,
    getPath,
    paginationOptions,
    handlePaginationChange,
  } = props;
  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }
  if (failed) {
    return <Retry text="Failed to load content" handleClick={retry} />;
  }

  return renderPhotos(
    photos,
    getPath,
    paginationOptions,
    handlePaginationChange,
    // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    children,
  );
};

PhotoList.defaultProps = {
  children: () => null,
};

function renderPhoto(
  photo: Photo,
  getPath: (id: number) => string,
  children: (photo: Photo) => any,
) {
  return (
    <div
      className="thumbnail"
      style={{ display: 'inline-block', width: '100%' }}
      key={photo.id}
    >
      <Link
        to={{
          pathname: getPath(photo.id),
          state: { parentPath: window.location.pathname },
        }}
      >
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          style={{ width: '100%' }}
        />
      </Link>
      {children(photo)}
    </div>
  );
}

export function renderPhotos(
  photos: Photo[],
  getPath: (id: number) => string,
  paginationOptions: PaginationOptions,
  handlePaginationChange: (event: React.SyntheticEvent, data: object) => any,
  children: (photo: Photo) => any,
) {
  return (
    <Grid columns={5}>
      {photos.map(
        (photo: Photo): JSX.Element => (
          <React.Fragment key={photo.id}>
            <Responsive maxWidth={767} as={React.Fragment}>
              <Responsive maxWidth={575} as={Grid.Column} width={16}>
                {renderPhoto(photo, getPath, children)}
              </Responsive>
              <Responsive minWidth={576} as={Grid.Column} width={8}>
                {renderPhoto(photo, getPath, children)}
              </Responsive>
            </Responsive>
            <Responsive
              minWidth={768}
              maxWidth={991}
              as={Grid.Column}
              width={4}
            >
              {renderPhoto(photo, getPath, children)}
            </Responsive>
            <Responsive minWidth={992} as={Grid.Column}>
              {renderPhoto(photo, getPath, children)}
            </Responsive>
          </React.Fragment>
        ),
      )}
      <Grid.Column width={16} textAlign="center">
        <Responsive maxWidth={575}>
          <Pagination
            activePage={paginationOptions.activePage}
            totalPages={paginationOptions.totalPages}
            onPageChange={handlePaginationChange}
            boundaryRange={0}
            siblingRange={1}
            firstItem={null}
            lastItem={null}
            size="tiny"
          />
        </Responsive>
        <Responsive minWidth={576}>
          <Pagination
            activePage={paginationOptions.activePage}
            totalPages={paginationOptions.totalPages}
            onPageChange={handlePaginationChange}
            boundaryRange={1}
            siblingRange={1}
          />
        </Responsive>
      </Grid.Column>
    </Grid>
  );
}

export default PhotoList;
