import React, { useEffect } from 'react';

import useStorageState from '../../hooks/useStorageState.js';
import viewExists from '../../helpers/view-exists.js';

import Start from '../../view/Start/index.jsx';
import Tutorial from '../../view/Tutorial/index.jsx';
import Game from '../../view/Game/index.jsx';
import Finish from '../../view/Finish/index.jsx';

const Content = () => {
  const [view, setView] = useStorageState('start', 'view');

  useEffect(() => {
    if (!viewExists(view)) setView('start');
  }, []);

  return (
    (view === 'start' && <Start />) ||
    (view === 'tutorial' && <Tutorial />) ||
    (view === 'game' && <Game />) ||
    (view === 'finish' && <Finish />)
  );
};

export default Content;
