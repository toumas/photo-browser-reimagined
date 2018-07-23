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
  getPath(): string;
}

export interface PhotoList {
  isLoading: boolean;
  failed: boolean;
  items: Photo[];
  retry(): void;
  children(photo: Photo): any;
  getPath(): string;
}

export interface PhotoContainerMatchParams {
  id: string;
}
