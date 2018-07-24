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

export interface PhotoList {
  isLoading: boolean;
  failed: boolean;
  photos: Photo[];
  retry(): void;
  children?(photo: Photo): any;
  getPath(id: string): string;
}

export interface PhotoContainerMatchParams {
  id: string;
}

export interface PhotosOptions {
  limit: string;
  page: string;
}
