import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Balloon = ({ children, ...props }) => {
  const { direction, blink } = props;

  return (
    <div className={`balloon ${direction} ${blink ? 'blink' : ''}`}>
      <span>{children}</span>
    </div>
  );
};

Balloon.propTypes = {
  direction: PropTypes.string,
  blink: PropTypes.bool,
};

Balloon.defaultProps = {
  direction: 'right',
  blink: false,
};

export default Balloon;
