module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['to'] },
    ],
    'import/no-named-as-default': 0,
  },
};
