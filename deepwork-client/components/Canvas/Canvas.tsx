import React, { useContext } from 'react'
import RainCanvas from './RainCanvas'
import { PomodoroContext } from '../../context/PomodoroContext'
import SnowCanvas from './SnowCanvas';

function Canvas() {
  const { state, dispatch } = useContext(PomodoroContext);
  const { backgroundEffect } = state;

  return (
    <div className="h-full w-full">
      <SnowCanvas />
    </div>
  )
}

export default Canvas