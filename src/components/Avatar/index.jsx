import React from 'react';
import PropTypes from 'prop-types';

import importAll from '../../helpers/import-images.js';

import './style.scss';

const images = importAll(
  require.context('../../../public/images/avatar', false, /\.(png)$/),
);

const Avatar = props => {
  const { number, type } = props;
  const typeCheck = ['idle', 'success', 'finish'].includes(type)
    ? type
    : 'idle';

  return (
    <img
      src={images[`${typeCheck}-${number}.png`]}
      alt="Avatar"
      className="avatar"
    />
  );
};

Avatar.propTypes = {
  number: PropTypes.number,
  type: PropTypes.string,
};

Avatar.defaultProps = {
  number: 1,
  type: 'idle',
};

export default Avatar;
