import React, { useContext } from 'react'
import RainCanvas from './RainCanvas'
import { PomodoroContext } from '../../context/PomodoroContext'

function Canvas() {
  const { state, dispatch } = useContext(PomodoroContext);
  const { backgroundEffect } = state;

  return (
    <div className="h-full w-full">
      {backgroundEffect == "Rain" && <RainCanvas />}
    </div>
  )
}

export default Canvas