import polyfill from 'cross-fetch';
import { FetchOptions } from './typings';

/* global fetch */
const base: string = 'http://localhost:3000';

enum Methods {
  Page = 'page',
  Limit = 'limit',
  Sort = 'sort',
  Order = 'order',
  Start = 'start',
  End = 'end',
  Gte = 'gte',
  Lte = 'lte',
  Ne = 'ne',
  Like = 'like',
  Embed = 'embed',
  Expand = 'expand',
}

function optionsToQueryParams(options: FetchOptions): string {
  return Object.entries(options).reduce(
    (acc, entry) =>
      `${acc}${Object.values(Methods).includes(entry[0]) ? '_' : ''}${
        entry[0]
      }=${entry[1]}&`,
    '',
  );
}

export const getPhotos = async (options: FetchOptions) => {
  const queryParams = optionsToQueryParams(options);
  const response = await fetch(`${base}/photos?${queryParams}`);
  return response.json();
};

export const getPhoto = async (id: string) => {
  const options = { expand: 'album' };
  const queryParams = optionsToQueryParams(options);
  const response = await fetch(`${base}/photos/${id}?${queryParams}`);
  return response.json();
};

export const getAlbums = async (options: FetchOptions) => {
  const queryParams = optionsToQueryParams(options);
  const response = await fetch(`${base}/albums?${queryParams}`);
  return response.json();
};
