import React from 'react';

import importAll from '../../helpers/import-images.js';

import './style.scss';

const images = importAll(
  require.context('../../../public/images/logo', false, /\.(png)$/),
);

const Logo = () => {
  return <img src={images['logo.png']} alt="Logo AbaMat" className="logo" />;
};

export default Logo;
