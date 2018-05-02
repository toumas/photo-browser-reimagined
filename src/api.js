const base = 'http://localhost:3000';
// eslint-disable-next-line no-undef
const { fetch } = window;

function optionsToQueryParams(options) {
  return `${Object.entries(options).map(
    entry => `_${entry[0]}=${entry[1]}&`,
  )}`.replace(',', '');
}

// eslint-disable-next-line import/prefer-default-export
export const getPhotos = async options => {
  const queryParams = optionsToQueryParams(options);
  const response = await fetch(`${base}/photos?${queryParams}`);
  return response.json();
};
