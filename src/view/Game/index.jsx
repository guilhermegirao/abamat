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
let blockNextQueue = false;

const imagesQuestions = importAll(
  require.context('../../../public/images/questions', false, /\.(png)$/),
);

const Game = () => {
  const [, setView] = useStorageState('game', 'view');

  const [number, setNumber] = useStorageState('0', 'stage');
  const [queue, setQueue] = useStorageState('[]', 'queue');
  const [tip, setTip] = useState(0);
  const [avatarNumber, setAvatarNumber] = useState(firstRandom);
  const [success, setSuccess] = useState(false);

  const queuePos = queue[number];
  const stage = stages[queuePos];
  const tipText = stage?.tips ? stage.tips[tip] : false;

  const [value, setValue] = useState(stage?.eggs_min || 0);

  const handleChange = e => {
    setValue(Number(e.target.value));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { response } = stage;

    if (value === response) {
      setSuccess(true);
    } else if (tip < stage.tips.length - 1) {
      setTip(prevState => prevState + 1);
      setAvatarNumber(random(1, 6));

      if (!blockNextQueue) {
        const newQueue = queue;
        const index = stage.repeat_next
          ? number + 1
          : random(number, queue.length);
        newQueue.splice(index, 0, stage.id - 1);
        setQueue(newQueue.toString().split(','));

        blockNextQueue = true;
      }
    }
  };

  const handleNext = () => {
    if (number === queue.length - 1) {
      setView('finish');
    } else {
      setNumber(prevState => Number(prevState + 1));
    }

    window.location.reload();
  };

  return (
    <div className="container">
      <div className="row center">
        <div className="col-sm-12">
          <div className="animate__animated animate__fadeIn game-container">
            <h1 className="indicator">
              Fase {stage.id}
              {success && ' concluída!'}
            </h1>
            <h3 className="question-container">
              <Text parse>{stage.text}</Text>
              {success && (
                <Text parse animated>
                  {`RESPOSTA: ${stage.answer}`}
                </Text>
              )}
            </h3>
            {(!success && (
              <div className="center">
                <form action="./" onSubmit={handleSubmit}>
                  {stage.eggs && (
                    <EggBox
                      min={stage.eggs_min}
                      max={stage.eggs_max}
                      amount={value}
                    />
                  )}

                  {stage.image && (
                    <img
                      src={imagesQuestions[`${stage.id}.png`]}
                      alt="Imagem da Questão"
                      className="question-image"
                    />
                  )}

                  {stage.expression && (
                    <h3 className="question-expression">
                      <Text animated parse>
                        {stage.expression}
                      </Text>
                    </h3>
                  )}

                  <div>
                    <Input
                      type="number"
                      min={0}
                      onChange={handleChange}
                      placeholder={texts.x_value}
                      required
                    />
                  </div>
                  <Button type="submit">RESPONDER</Button>
                </form>
              </div>
            )) || (
              <div>
                <div className="center">
                  <div className="success-game-container">
                    {stage.eggs && (
                      <EggBox
                        min={stage.eggs_min}
                        max={stage.eggs_max}
                        amount={stage.eggs_min}
                        animated
                      />
                    )}
                    <Button onClick={handleNext}>PRÓXIMA FASE</Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <AvatarContainer>
            {tipText && (
              <div
                className={
                  !success
                    ? `animate__animated animate__bounceInLeft`
                    : `animate__animated animate__bounceOutLeft`
                }
              >
                <Balloon direction="right">
                  <Text parse>{`DICA: ${tipText}`}</Text>
                </Balloon>
                <Avatar type="idle" number={avatarNumber} />
              </div>
            )}
            {success && (
              <div className="animate__animated animate__bounceInLeft animate__delay-0.5s">
                <div className="avatar-success-container">
                  <Sparkles>
                    <Avatar type="success" number={random(1, 21)} />
                  </Sparkles>
                </div>
              </div>
            )}
          </AvatarContainer>
        </div>
      </div>
    </div>
  );
};

export default Game;
