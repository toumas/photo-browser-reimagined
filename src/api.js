import 'cross-fetch/polyfill';

/* global fetch */
const base = 'http://localhost:3000';

const methods = [
  'page',
  'limit',
  'sort',
  'order',
  'start',
  'end',
  'gte',
  'lte',
  'ne',
  'like',
  'embed',
  'expand',
];

function optionsToQueryParams(options) {
  return Object.entries(options).reduce(
    (acc, entry) =>
      `${acc}${methods.includes(entry[0]) ? '_' : ''}${entry[0]}=${entry[1]}&`,
    '',
  );
}

export const getPhotos = async options => {
  const queryParams = optionsToQueryParams(options);
  const response = await fetch(`${base}/photos?${queryParams}`);
  return response.json();
};

export const getPhoto = async id => {
  const options = { expand: 'album' };
  const queryParams = optionsToQueryParams(options);
  const response = await fetch(`${base}/photos/${id}?${queryParams}`);
  return response.json();
};

export const getAlbums = async options => {
  const queryParams = optionsToQueryParams(options);
  const response = await fetch(`${base}/albums?${queryParams}`);
  return response.json();
};
