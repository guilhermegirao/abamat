import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Balloon = ({ children, ...props }) => {
  const { direction } = props;

  return (
    <div className={`balloon ${direction}`}>
      <span>{children}</span>
    </div>
  );
};

Balloon.propTypes = {
  direction: PropTypes.string,
};

Balloon.defaultProps = {
  direction: 'right',
};

export default Balloon;
