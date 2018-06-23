import React from 'react';
import PropTypes from 'prop-types';

const Retry = ({ text, handleClick }) => (
  <div>
    <span>{text}</span>
    <button onClick={handleClick}>Retry</button>
  </div>
);

Retry.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Retry;
