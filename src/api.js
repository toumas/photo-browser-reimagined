const base = 'http://localhost:3000';
// eslint-disable-next-line no-undef
const { fetch } = window;

// eslint-disable-next-line import/prefer-default-export
export const getPhotos = async () => {
  const response = await fetch(`${base}/photos`);
  return response.json();
};
