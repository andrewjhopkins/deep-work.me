import React, { useContext, useEffect } from 'react'
import RainCanvas from './RainCanvas'
import { PomodoroContext } from '../../context/PomodoroContext'
import SnowCanvas from './SnowCanvas';

function Canvas() {
  const { state, dispatch } = useContext(PomodoroContext);
  const { backgroundEffect } = state;

  useEffect(() => {
      if(localStorage.getItem("deep-work:settings:backgroundEffect")) {
          let backgroundEffect = JSON.parse(localStorage.getItem("deep-work:settings:backgroundEffect"));
          dispatch({...state, backgroundEffect: backgroundEffect, type: "update_background_effect"})
      }
  }, [])

  return (
    <div className="h-full w-full">
      {backgroundEffect == "Rain" && <RainCanvas />}
      {backgroundEffect == "Snow" && <SnowCanvas />}
    </div>
  )
}

export default Canvas