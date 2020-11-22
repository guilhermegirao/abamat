import React from 'react';

import importAll from '../../helpers/import-images.js';

const images = importAll(
  require.context('../../../public/images/questions', false, /\.(png)$/),
);

const Image = props => {
  const { src, path, alt } = props;

  return <img src={images[src]} alt={alt} {...props} />;
};

export default Image;
