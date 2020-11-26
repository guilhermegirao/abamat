import React, { useState, useRef, useEffect } from 'react';
import Sparkles from '@chad.b.morrow/sparkles';
import useSound from 'use-sound';
import useStorageState from '../../hooks/useStorageState.js';
import useTimeout from '../../hooks/useTimeout.js';

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

const sounds = importAll(
  require.context('../../../public/sounds', false, /\.(mp3)$/),
);

const Game = ({ tutorial }) => {
  const [, setView] = useStorageState('game', 'view');
  const [soundEnabled] = useStorageState(true, 'soundEnabled');

  const [number, setNumber] = !tutorial
    ? useStorageState(0, 'stage')
    : useStorageState(0, 'tutorial_stage');
  const [queue, setQueue] = !tutorial
    ? useStorageState('[]', 'queue')
    : useStorageState('[]', 'tutorial_queue');

  const [tip, setTip] = useState(0);
  const [avatarNumber, setAvatarNumber] = useState(firstRandom);
  const [success, setSuccess] = useState(false);

  const [blink, setBlink] = useState(false);
  const [eggAnimate, setEggAnimate] = useState(false);

  const queuePos = queue[number];
  const stage = stages[queuePos];
  let tipText = false;

  if (!tutorial) {
    tipText = stage?.tips ? stage.tips[tip] : false;
  } else {
    tipText = stage?.tutorial_tips ? stage.tutorial_tips[tip] : false;
  }

  const textInput = useRef(null);

  const [value, setValue] = useState(stage?.eggs_min || 0);

  const [playBip] = useSound(sounds['bip.mp3'], {
    volume: 0.5,
    soundEnabled,
  });

  const [playSuccess] = useSound(sounds[`${stage.id}.mp3`], {
    volume: 1.0,
    soundEnabled,
  });

  const [playObjetivo] = useSound(sounds['objetivo.mp3'], {
    volume: 1.0,
    soundEnabled,
  });

  useTimeout(() => {
    if (tutorial && number === 0) {
      playObjetivo();
    }
  }, 1000);

  const handleChange = e => {
    setValue(Number(e.target.value));
  };

  const blinkBalloon = () => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
    }, 1000);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { response } = stage;

    if (value === response) {
      setSuccess(true);
      setTimeout(() => {
        playSuccess();
      }, 700);
    } else {
      const input = textInput.current.ref.current;

      input.value = '';
      input.focus();
      setValue(0);
      blinkBalloon();

      playBip();

      if (tip < stage.tips.length - 1) {
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
    }
  };

  const handleNext = () => {
    if (number === queue.length - 1) {
      if (!tutorial) {
        setView('finish');
      } else {
        setView('game');
      }
    } else {
      setNumber(prevState => Number(prevState + 1));
    }
    window.location.reload();
  };

  const tutorialNext = () => {
    if (tip < stage.tutorial_tips.length - 1) {
      setTip(prevState => prevState + 1);
      setAvatarNumber(random(1, 6));
      blinkBalloon();

      playBip();
    } else if (number === 0) {
      playBip();
      setEggAnimate(true);
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          playSuccess();
        }, 700);
      }, 2000);
    } else if (number === 1) {
      if (value === 20) {
        playBip();
        setTimeout(() => {
          setSuccess(true);
        }, 1000);
      }
      setValue(20);
      setTimeout(() => {
        const input = textInput.current.ref.current;

        input.value = '20';
        input.focus();
      }, 500);
    }
  };

  return (
    <div className="container">
      <div className="row center">
        <div className="col-sm-12">
          <div
            className={`animate__animated game-container ${
              !success
                ? 'animate__fadeIn'
                : 'animate__bounceInUp animate__delay-1s'
            }`}
          >
            <h1 className="indicator">
              {(!tutorial &&
                ((!success && <Text>{`Fase ${stage.phase}`}</Text>) || (
                  <Text animated>{`Fase ${stage.phase} concluída!`}</Text>
                ))) || <Text animated>{`TUTORIAL ${stage.id}`}</Text>}
            </h1>
            <h3 className="question-container">
              {(!success && <Text parse>{stage.text}</Text>) || (
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
                      animated={eggAnimate}
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
                    {(!tutorial && (
                      <Input
                        ref={textInput}
                        type="number"
                        min={0}
                        onChange={handleChange}
                        placeholder={texts.x_value}
                        autoFocus
                        required
                        readOnly={tutorial}
                      />
                    )) ||
                      (tutorial && number === 1 && value > 0 && (
                        <Input
                          ref={textInput}
                          type="number"
                          min={0}
                          onChange={handleChange}
                          placeholder={texts.x_value}
                          autoFocus
                          required
                        />
                      ))}
                  </div>
                  {(!tutorial && <Button type="submit">RESPONDER</Button>) ||
                    (tutorial && !success && (
                      <Button onClick={() => tutorialNext()}>CONTINUAR</Button>
                    ))}
                </form>
              </div>
            )) || (
              <div>
                <div className="center">
                  <div className="success-game-container">
                    <Button onClick={handleNext}>
                      {!tutorial ? 'PRÓXIMA FASE' : 'CONTINUAR'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <AvatarContainer>
            {tipText && !success && (
              <div
                className={`animate__animated animate__bounceInRight ${
                  !tutorial ? 'animate__delay-3s' : 'animate__delay-0.5s'
                }`}
              >
                <Balloon direction="right" blink={blink}>
                  <Text parse>{`DICA: ${tipText}`}</Text>
                </Balloon>
                <Avatar type="idle" number={avatarNumber} />
              </div>
            )}
            {success && (
              <div className="animate__animated animate__bounceInRight">
                <div className="avatar-success-container">
                  <Sparkles maxSize={100} rate={300}>
                    <Avatar type="success" number={stage.id} />
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
