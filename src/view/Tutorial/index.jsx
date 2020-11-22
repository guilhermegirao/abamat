import React, { useState } from 'react';
import Sparkles from '@chad.b.morrow/sparkles';
import useStorageState from '../../hooks/useStorageState.js';

import AvatarContainer from '../../components/AvatarContainer/index.jsx';
import Avatar from '../../components/Avatar/index.jsx';
import Balloon from '../../components/Balloon/index.jsx';
import Button from '../../components/Button/index.jsx';
import EggBox from '../../components/EggBox/index.jsx';
import Input from '../../components/Input/index.jsx';
import Text from '../../components/Text/index.jsx';

import random from '../../helpers/random.js';
import importAll from '../../helpers/import-images.js';

import texts from '../../data/texts.json';
import stages from '../../data/stages.json';

const firstRandom = random(1, 6);
const blockNextQueue = false;

const imagesQuestions = importAll(
  require.context('../../../public/images/questions', false, /\.(png)$/),
);

const Tutorial = () => {
  const [, setView] = useStorageState('tutorial', 'view');

  const [tip, setTip] = useState(0);

  const [value, setValue] = useState(0);

  const handleChange = e => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="container">
      <div className="row center">
        <div className="col-sm-12">
          <div className="animate__animated animate__fadeIn game-container">
            <h1 className="indicator">TUTORIAL 1</h1>
            <h3 className="question-container">
              <Text parse>TEXTE</Text>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
