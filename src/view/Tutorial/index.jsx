import React, { useState } from 'react';
import useStorageState from '../../hooks/useStorageState.js';

import Button from '../../components/Button/index.jsx';

import Game from '../Game/index.jsx';

const Tutorial = () => {
  const [, setView] = useStorageState('tutorial', 'view');
  const [, setTutorialQueue] = useStorageState([0, 1], 'tutorial_queue');

  const [skipTutorial, setSkipTutorial] = useStorageState(
    true,
    'skip_tutorial',
  );

  const handleTutorial = () => {
    setSkipTutorial(false);
  };

  const handleSkipTutorial = () => {
    setView('game');
    window.location.reload();
  };

  return (
    <div className="container">
      {(skipTutorial && (
        <div className="row center">
          <div className="col-sm-12">
            <div className="animate__animated animate__bounceInUp game-container">
              <div className="w-100">
                <Button onClick={() => handleTutorial()}>VER TUTORIAL?</Button>
              </div>
              <Button blue noSized onClick={() => handleSkipTutorial()}>
                PULAR TUTORIAL?
              </Button>
            </div>
          </div>
        </div>
      )) || <Game tutorial />}
    </div>
  );
};

export default Tutorial;
