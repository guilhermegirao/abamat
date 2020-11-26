import React, { useState, useEffect } from 'react';
import { Animate } from 'react-simple-animate';
import Sparkles from '@chad.b.morrow/sparkles';
import useSound from 'use-sound';
import useStorageState from '../../hooks/useStorageState.js';

import Avatar from '../../components/Avatar/index.jsx';
import Balloon from '../../components/Balloon/index.jsx';
import Button from '../../components/Button/index.jsx';
import Text from '../../components/Text/index.jsx';

import storageClear from '../../helpers/storage-clear';
import importAll from '../../helpers/import-images.js';

import texts from '../../data/texts.json';

const sounds = importAll(
  require.context('../../../public/sounds', false, /\.(mp3)$/),
);

const Finish = () => {
  const [soundEnabled] = useStorageState(true, 'soundEnabled');

  const [showFinish, setShowFinish] = useState(false);

  const [playEnd] = useSound(sounds['end.mp3'], {
    volume: 0.5,
    soundEnabled,
  });

  useEffect(() => {
    playEnd();
  }, [showFinish]);

  return (
    <div className="container">
      {(!showFinish && (
        <div className="row center">
          <div className="col-xs-12">
            <Animate
              play
              duration={6}
              start={{ opacity: 0 }}
              end={{ opacity: 1 }}
              onComplete={() => setShowFinish(true)}
            >
              <>
                <div className="animate__animated animate__bounceInRight">
                  <div className="avatar-success-container">
                    <Sparkles maxSize={100} rate={300}>
                      <Avatar type="finish" number={5} />
                    </Sparkles>
                  </div>
                </div>
              </>
            </Animate>
          </div>
        </div>
      )) || <FinishScreen />}
    </div>
  );
};

const FinishScreen = () => {
  const handleClick = () => {
    storageClear();
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="row center">
        <div className="col-sm-12">
          <div className="animate__animated animate__bounceInUp game-container">
            <div className="game-container-inner">
              <Balloon direction="right">
                <Text parse>{texts.finish_text}</Text>
              </Balloon>
              <Avatar type="finish" number={4} />
            </div>
            <div className="display-inline-block">
              <Button onClick={handleClick}>JOGAR NOVAMENTE</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finish;
