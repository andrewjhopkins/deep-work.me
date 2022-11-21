import React, { useEffect, useState } from 'react'

function Pomodoro() {
  const [secondsRemaining, setSecondsRemaining] = useState(1500);
  const [timerRunning, setTimeRunning] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecondsRemaining(secondsRemaining - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [secondsRemaining]);

  return (
    <div className="border-2 h-72 w-80 border-black grid grid-rows-6">
      <div className="row-span-1 border-black grid grid-cols-2">
        <div className="m-auto text-1xl">
          Short Break
        </div>
        <div className="m-auto text-1xl">
          Long Break
        </div>
      </div>

      <div className="row-span-1 grid grid-cols-1">
        <div className="m-auto text-1xl">
          Session
        </div>
      </div>

      <div className="row-span-3 grid grid-cols-1">
        <div className="text-8xl my-0 mx-auto">
          {secondsToDigital(secondsRemaining)}
        </div>
      </div>

      <div className="row-span-1 grid grid-cols-2">
        <div className="m-auto my-0 mx-auto">
          Start
        </div>
        <div className="m-auto my-0 mx-auto">
          Reset
        </div>
      </div>

    </div>
  )
}

function secondsToDigital(secondsRemaining: number): string {
  let minutes = Math.floor(secondsRemaining / 60);
  let seconds = secondsRemaining - minutes * 60;

  let minutesString: string = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  var secondsString: string  = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  return minutesString + ":" + secondsString;
}

export default Pomodoro