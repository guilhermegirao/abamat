import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spritesheet from 'react-responsive-spritesheet';

import importAll from '../../helpers/import-images.js';

import './style.scss';

const images = importAll(
  require.context('../../../public/images/eggs', false, /\.(png)$/),
);

const EggBox = props => {
  const { amount, animated, min, max } = props;
  const [spriteState, setSpriteState] = useState(null);
  const path = images;

  let w = 770;
  let h = 424;
  if (max === 20) {
    w = 655;
    h = 444;
  } else if (max === 24) {
    w = 775;
    h = 445;
  }

  useEffect(() => {
    if (spriteState !== null) {
      let start = min + amount;
      if (start > max) start = max + 1;

      spriteState.setStartAt(start);
      spriteState.goToAndPause(start);
    }
  }, [amount]);

  return (
    <>
      <Spritesheet
        className="egg-box"
        image={images[`${max}x_eggs_sheet.png`]}
        widthFrame={w}
        heightFrame={h}
        steps={max + 1}
        fps={max + 1}
        autoplay={animated}
        startAt={amount + 1}
        getInstance={spritesheet => {
          setSpriteState(spritesheet);
        }}
      />
    </>
  );
};

EggBox.propTypes = {
  amount: PropTypes.number,
  animated: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};

EggBox.defaultProps = {
  amount: 0,
  animated: false,
  min: 0,
  max: 12,
};

export default EggBox;
