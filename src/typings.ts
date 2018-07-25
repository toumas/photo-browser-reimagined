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
  retry(): void;
  getPath(id: string): string;
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
  retry(): void;
  children?(photo: Photo): JSX.Element | null;
  getPath(id: string): string;
}

export interface PhotoContainerMatchParams {
  id: string;
}

export interface FetchOptions {
  limit?: string;
  page?: string;
  expand?: string;
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
