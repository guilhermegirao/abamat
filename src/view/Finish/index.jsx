import React from 'react';
import Sparkles from '@chad.b.morrow/sparkles';

import AvatarContainer from '../../components/AvatarContainer/index.jsx';
import Avatar from '../../components/Avatar/index.jsx';
import Balloon from '../../components/Balloon/index.jsx';
import Button from '../../components/Button/index.jsx';
import Text from '../../components/Text/index.jsx';

import storageClear from '../../helpers/storage-clear';

import texts from '../../data/texts.json';

const Finish = () => {
  const handleClick = () => {
    storageClear();
    window.location.reload();
  };

  return (
    <>
      <div className="row center">
        <div className="col-sm-12">
          <div className="animate__animated animate__fadeIn game-container">
            <div className="game-container-inner">
              <Balloon direction="right">
                <Text parse>{texts.finish_text}</Text>
              </Balloon>
              <Avatar type="finish" number={3} />
            </div>
            <div className="display-inline-block">
              <Button onClick={handleClick}>JOGAR NOVAMENTE</Button>
            </div>
          </div>
        </div>
      </div>
      <AvatarContainer>
        <div className="animate__animated animate__bounceInLeft animate__delay-0.5s">
          <div className="avatar-success-container">
            <Sparkles>
              <Avatar type="finish" number={5} />
            </Sparkles>
          </div>
        </div>
      </AvatarContainer>
    </>
  );
};

export default Finish;
