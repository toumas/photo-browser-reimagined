import { SyntheticEvent } from 'react';
import { DispatchProp } from 'react-redux';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotosProps {
  failed: boolean;
  isLoading: boolean;
  photos: Photo[];
  paginationOptions: PaginationOptions;
  retry(): void;
  getPath(id: number): string;
  handlePaginationChange(event: SyntheticEvent, data: object);
}

export interface AlbumsProps {
  failed: boolean;
  isLoading: boolean;
  photos: AlbumThumbnail[];
  retry(): void;
  getPath(id: string): string;
}

export interface PhotoList {
  isLoading: boolean;
  failed: boolean;
  photos: Photo[];
  paginationOptions: PaginationOptions;
  handlePaginationChange(event: SyntheticEvent, data: object);
  retry(): void;
  children?(photo: Photo): JSX.Element | null;
  getPath(id: number): string;
}

export interface PaginationOptions {
  activePage: string;
  totalPages: number;
}

export interface PhotoContainerMatchParams {
  id: string;
}

export interface FetchOptions {
  limit?: string;
  page?: string;
  expand?: string;
  albumId?: string;
}

export interface AlbumThumbnail {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotoProps {
  failed: boolean;
  isLoading: boolean;
  photo: Photo;
  retry(): DispatchProp;
}

export interface Album {
  id: number;
  userId: number;
  title: string;
}
