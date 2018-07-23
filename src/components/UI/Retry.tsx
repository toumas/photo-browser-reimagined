import * as React from 'react';

interface Props {
  text: string;
  handleClick(): void;
}

const Retry: React.SFC<Props> = ({ text, handleClick }) => (
  <div>
    <span>{text}</span>
    <button onClick={handleClick}>Retry</button>
  </div>
);

export default Retry;
