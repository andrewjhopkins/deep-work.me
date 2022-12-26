import React, { useContext, useEffect } from 'react'
import RainCanvas from './RainCanvas'
import { Context } from '../../context/Context'
import SnowCanvas from './SnowCanvas';
import { actionType } from '../../reducers/reducerActionTypes';

function Canvas() {
  const { state, dispatch } = useContext(Context);
  const { backgroundEffect } = state;

  useEffect(() => {
      if(localStorage.getItem("deep-work:settings:backgroundEffect")) {
          let backgroundEffect = JSON.parse(localStorage.getItem("deep-work:settings:backgroundEffect"));
          dispatch({...state, backgroundEffect: backgroundEffect, type: actionType.update_background_effect})
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