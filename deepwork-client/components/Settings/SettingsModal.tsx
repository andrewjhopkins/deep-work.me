import React, { useContext, useEffect } from 'react'
import { Context, TimeMode } from "../../context/Context";
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';
import { actionType } from '../../reducers/reducerActionTypes';
import { IconContext } from "react-icons";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useTheme } from 'next-themes';

const SettingsModal = () =>  {
    const { theme, setTheme } = useTheme();
    const { state, dispatch } = useContext(Context);
    const { showSettings, timeSettings, backgroundEffect, soundEnabled } = state;

    const backgroundEffects = ["None", "Rain", "Snow"];

    const toggleShowSettings = () => {
        dispatch({...state, type: actionType.toggle_show_settings});
    }

    const updateInitialTime = (timeMode: TimeMode, change: number) => {
      if (timeSettings[timeMode].initialTime + change >= 0 && timeSettings[timeMode].initialTime + change <= 7200) {
        timeSettings[timeMode].initialTime += change;
        dispatch({...state, timeSettings: timeSettings, type: actionType.update_time_settings});
      }
    }

    const defaultSettings = () => {
      dispatch({...state, type: actionType.default_time_settings});
    }

    const toggleBackground = (backgroundEffect: string) => {
      dispatch({...state, backgroundEffect: backgroundEffect, type: actionType.update_background_effect})
    }

    const toggleSoundSettings = (soundEnabled: boolean) => {
      dispatch({...state, soundEnabled, type: actionType.update_sound_setting})
    }

    const timeSettingsDisplay = Object.entries(timeSettings).map(([key, value]) => {
      return (
        <div key={value.name} className="col-span-2 grid grid-rows-4">
          <div className="row-span-1 text-center text-zinc-800 dark:text-white">
            {value.name}
          </div>
          <div className="row-span-2 grid grid-cols-12 mt-2 mx-2 text-zinc-800 dark:text-white">
            <div onClick={() => updateInitialTime(key as TimeMode, -60)} className="cursor-pointer font-bold border-gray-300 col-span-3 flex justify-center items-center text-center text-zinc-800 bg-gray-300 hover:bg-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"><span className="">-</span></div>
            <text className="col-span-6 flex justify-center items-center text-center bg-gray-300 dark:bg-gray-600">{formatSecondsIntoMinutesAndSeconds(value.initialTime)}</text>
            <div onClick={() => updateInitialTime(key as TimeMode, 60)} className="cursor-pointer font-bold col-span-3 flex justify-center items-center text-center bg-gray-300 text-zinc-800 hover:bg-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"><span className="">+</span></div>
          </div>
          <div className="row-span-1"></div>
        </div>
      );
    });

    const backgroundSettingsDisplay = backgroundEffects.map((background, index) => {
      return (
        <div onClick={() => toggleBackground(background)} key={background} className={`${index == 0 ? "col-start-4" : ""} ${backgroundEffect == background ? "bg-gray-500 dark:bg-gray-700" : "bg-gray-300 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"} mt-2 mx-1 mb-2 cursor-pointer font-bold border-gray-300 col-span-2 flex justify-center items-center text-center text-zinc-800 dark:text-white`}><span className="">{background}</span></div>
      );
    });

    return (
      <>
        {showSettings ? (
          <>
            <div style={{ zIndex: 999}} className="fixed inset-0 mx-auto my-32 h-fit w-96 border-2 z-10 border-2 rounded-lg bg-gray-400 dark:border-gray-900 dark:bg-gray-800">

                <div className="h-10 text-center text-1xl text-zinc-800 dark:text-white">
                  <div className="my-2">Settings</div>
                </div>

                <div className="h-80 grid grid-rows-5">
                  <div className="row-span-1 grid grid-rows-6">
                    <div className="row-span-2 text-1xl flex justify-center items-center text-zinc-800 dark:text-white">Theme</div>
                    <div className="row-span-4 grid grid-cols-6">

                        <div onClick={() => setTheme("light")} className={`${theme == "light" ? "bg-gray-500 dark:bg-gray-700" : "bg-gray-300 dark:bg-gray-600"} col-start-3 mt-2 mx-1 mb-2 cursor-pointer font-bold border-gray-300 col-span-1 flex justify-center items-center text-center text-zinc-800 dark:text-white`}>
                          <IconContext.Provider value={{ size: '18px' }}>
                              <BsFillSunFill />
                          </IconContext.Provider>
                        </div>

                        <div onClick={() => setTheme("dark")} className={`${theme == "light" ? "bg-gray-300 dark:bg-gray-600" : "bg-gray-500 dark:bg-gray-700"} mt-2 mx-1 mb-2 cursor-pointer font-bold border-gray-300 col-span-1 flex justify-center items-center text-center text-zinc-800 dark:text-white`}>
                          <IconContext.Provider value={{ size: '18px' }}>
                              <BsFillMoonFill />
                          </IconContext.Provider>
                        </div>

                    </div>
                  </div>

                  <div className="row-span-2 grid grid-rows-4">
                    <div className="row-span-1 text-1xl flex justify-center items-center text-zinc-800 dark:text-white">Time (minutes)</div>
                    <div className="row-span-3 grid grid-cols-6">
                      {timeSettingsDisplay}
                    </div>
                  </div>

                  <div className="row-span-1 grid grid-rows-6">
                    <div className="row-span-2 text-1xl flex justify-center items-center text-zinc-800 dark:text-white">Timer Sounds</div>
                    <div className="row-span-4 grid grid-cols-6">
                        <div onClick={() => toggleSoundSettings(true)} className={`${soundEnabled ? "bg-gray-500 dark:bg-gray-700" : "bg-gray-300 dark:bg-gray-600"} col-start-3 mt-2 mx-1 mb-2 cursor-pointer font-bold border-gray-300 col-span-1 flex justify-center items-center text-center text-zinc-800 dark:text-white`}><span className="">On</span></div>
                        <div onClick={() => toggleSoundSettings(false)} className={`${soundEnabled ? "bg-gray-300 dark:bg-gray-600" : "bg-gray-500 dark:bg-gray-700"} mt-2 mx-1 mb-2 cursor-pointer font-bold border-gray-300 col-span-1 flex justify-center items-center text-center text-zinc-800 dark:text-white`}><span className="">Off</span></div>
                    </div>
                  </div>

                  <div className="row-span-1 grid grid-rows-6">
                    <div className="row-span-2 text-1xl text-center text-zinc-800 dark:text-white">Background Effect</div>
                    <div className="row-span-4 grid grid-cols-12">
                      {backgroundSettingsDisplay}
                    </div>
                  </div>
              </div>

              <div className="h-10 grid grid-cols-2">
                <div onClick={defaultSettings} className="cursor-pointer border col-span-1 flex justify-center items-center rounded-l-md text-zinc-800 bg-gray-300 hover:bg-gray-500 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-gray-900">Default</div>
                <div onClick={toggleShowSettings} className="cursor-pointer border col-span-1 flex justify-center items-center rounded-r-md text-zinc-800 bg-gray-300 hover:bg-gray-500 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-gray-900">Close</div>
              </div>

            </div>
            <div onClick={toggleShowSettings} className="fixed inset-0 h-full w-full fixed z-50 bg-black opacity-60"></div>
          </>
        ) : null}
      </>
    );
  }

export default SettingsModal;