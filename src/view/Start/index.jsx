import React, { useState, useEffect } from 'react';
import { Animate } from 'react-simple-animate';
import useSound from 'use-sound';
import useStorageState from '../../hooks/useStorageState.js';

import AvatarContainer from '../../components/AvatarContainer/index.jsx';
import Avatar from '../../components/Avatar/index.jsx';
import Balloon from '../../components/Balloon/index.jsx';
import Button from '../../components/Button/index.jsx';
import Input from '../../components/Input/index.jsx';
import Logo from '../../components/Logo/index.jsx';
import Text from '../../components/Text/index.jsx';

import range from '../../helpers/range.js';
import importAll from '../../helpers/import-images.js';

import './style.scss';
import texts from '../../data/texts.json';
import stages from '../../data/stages.json';

const imagesSound = importAll(
  require.context('../../../public/images/sound', false, /\.(png)$/),
);

const sounds = importAll(
  require.context('../../../public/sounds', false, /\.(mp3)$/),
);

const Start = () => {
  const [showPlay, setShowPlay] = useState(false);

  return (
    <div className="container">
      {(!showPlay && (
        <div className="row center">
          <div className="col-xs-12">
            <Animate
              play
              duration={2}
              start={{ opacity: 0 }}
              end={{ opacity: 1 }}
              onComplete={() => setShowPlay(true)}
            >
              <Logo />
            </Animate>
          </div>
        </div>
      )) || <StartScreen />}
    </div>
  );
};

const StartScreen = () => {
  const [, setView] = useStorageState('start', 'view');
  const [soundEnabled, setSoundEnabled] = useStorageState(true, 'soundEnabled');
  const [selectName, setSelectName] = useState(false);
  const [inputName, setInputName] = useState('');
  const [, setName] = useStorageState('Jogador', 'player_name');
  const [, setQueue] = useStorageState('[]', 'queue');

  const [btnText, setBtnText] = useState('JOGAR');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [playStart] = useSound(sounds['start.mp3'], {
    volume: 0.5,
    soundEnabled,
    interrupt: true,
  });

  const [playLegalJogar] = useSound(sounds['legal-jogar.mp3'], {
    volume: 0.5,
    soundEnabled,
    interrupt: true,
  });

  const [playBip] = useSound(sounds['bip.mp3'], {
    volume: 0.5,
    soundEnabled,
  });

  const balloonText = !selectName ? texts.entry_text : texts.entry_name;
  const avatarNumber = !selectName ? 5 : 6;

  const handlePlay = () => {
    if (soundEnabled) {
      playStart();
      setBtnText('CARREGANDO...');
      setBtnDisabled(true);

      setTimeout(() => {
        setSelectName(true);
      }, 8500);
    } else {
      setSelectName(true);
    }
  };

  useEffect(() => {
    playLegalJogar();
  }, [selectName]);

  const handleClickContinue = () => {
    const stagesNum = stages.length;
    const queue = range(stagesNum);

    setName(inputName);
    setView('tutorial');
    setQueue(queue);

    window.location.reload();
  };

  const handleSoundButton = () => {
    setSoundEnabled(prevState => !prevState);
    playBip();
  };

  return (
    <div className="row center">
      <div className="col-sm-12">
        <div className="absolute-container">
          <Button blue onClick={() => handleSoundButton()}>
            <img
              src={imagesSound[`${soundEnabled}.png`]}
              alt="Sound"
              className="sound-image"
            />
          </Button>
        </div>
        <div className="animate__animated animate__bounceInUp start-container">
          <div className="logo-container">
            <Logo />
          </div>
          {(!selectName && (
            <Button onClick={() => handlePlay()} disabled={btnDisabled}>
              {btnText}
            </Button>
          )) || (
            <div className="animate__animated animate__bounceInUp">
              <div>
                <Input
                  type="text"
                  onChange={e => setInputName(e.target.value)}
                  placeholder="Insira aqui seu nome"
                />
              </div>
              <Button onClick={handleClickContinue}>CONTINUAR</Button>
            </div>
          )}
        </div>
        <AvatarContainer>
          <div className="animate__animated animate__bounceInRight animate__delay-1s">
            <Balloon direction="right">
              <Text parse>{balloonText}</Text>
            </Balloon>
            <Avatar type="idle" number={avatarNumber} />
          </div>
        </AvatarContainer>
      </div>
    </div>
  );
};

export default Start;
