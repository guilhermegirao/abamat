import React, { useState } from 'react';
import { Animate } from 'react-simple-animate';
import useStorageState from '../../hooks/useStorageState.js';

import AvatarContainer from '../../components/AvatarContainer/index.jsx';
import Avatar from '../../components/Avatar/index.jsx';
import Balloon from '../../components/Balloon/index.jsx';
import Button from '../../components/Button/index.jsx';
import Input from '../../components/Input/index.jsx';
import Logo from '../../components/Logo/index.jsx';
import Text from '../../components/Text/index.jsx';

import range from '../../helpers/range.js';

import './style.scss';
import texts from '../../data/texts.json';
import stages from '../../data/stages.json';

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
  const [selectName, setSelectName] = useState(false);
  const [inputName, setInputName] = useState('');
  const [, setName] = useStorageState('Jogador', 'player_name');
  const [, setQueue] = useStorageState('[]', 'queue');

  const balloonText = !selectName ? texts.entry_text : texts.entry_name;
  const avatarNumber = !selectName ? 5 : 6;

  const handleClickContinue = () => {
    const stagesNum = stages.length;
    const queue = range(stagesNum);

    setName(inputName);
    setView('game');
    setQueue(queue);

    window.location.reload();
  };

  return (
    <div className="row center">
      <div className="col-sm-12">
        <div className="animate__animated animate__bounceInUp start-container">
          <div className="logo-container">
            <Logo />
          </div>
          {(!selectName && (
            <Button onClick={() => setSelectName(true)}>JOGAR</Button>
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
          <div className="animate__animated animate__bounceInLeft animate__delay-1s">
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
