import React, { useContext } from 'react'
import { PomodoroContext, TimeMode } from "../../context/PomodoroContext";
import { formatSecondsIntoMinutesAndSeconds, serializeDate } from '../../utils/date';

const SettingsModal = () =>  {

    const { state, dispatch } = useContext(PomodoroContext);
    const { showSettings, timeSettings } = state;

    const toggleShowSettings = () => {
        dispatch({...state, type: "toggle_show_settings"});
    }

    const updateInitialTime = (timeMode: TimeMode, change: number) => {
      if (timeSettings[timeMode].initialTime + change >= 0 && timeSettings[timeMode].initialTime + change <= 7200) {
        timeSettings[timeMode].initialTime += change;
        dispatch({...state, timeSettings: timeSettings, type: "update_time_settings"});
      }
    }

    const defaultSettings = () => {
      dispatch({...state, type: "default_time_settings"});
    }

    const timeSettingsDisplay = Object.entries(timeSettings).map(([key, value]) => {
      return (
        <div className="col-span-2 grid grid-rows-4">
          <div className="row-span-1 text-white text-center">
            {value.name}
          </div>
          <div className="row-span-2 text-white grid grid-cols-12 mt-2 mx-2">
            <div onClick={() => updateInitialTime(key as TimeMode, -60)} className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-bold border-gray-300 col-span-3 flex justify-center items-center text-center"><span className="">-</span></div>
            <text className="bg-gray-600 col-span-6 flex justify-center items-center text-center">{formatSecondsIntoMinutesAndSeconds(value.initialTime)}</text>
            <div onClick={() => updateInitialTime(key as TimeMode, 60)} className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white  font-bold col-span-3 flex justify-center items-center text-center"><span className="">+</span></div>
          </div>
        </div>
      );
    });

    return (
      <>
        {showSettings ? (
          <>
            <div style={{ zIndex: 999}} className="fixed inset-0 mx-auto my-32 h-64 w-96 border-2 z-10 border-2 border-gray-900 bg-gray-800 rounded-lg grid grid-rows-6">
                <div className="row-span-1 text-white text-center text-1xl border-b">
                  <div className="my-2">Settings</div>
                </div>

                <div className="row-span-4 grid grid-rows-4 border-b border-gray-900">

                  <div className="row-span-1 text-white text-1xl text-center my-4">Time (minutes)</div>
                  <div className="row-span-3 grid grid-cols-6 my-4">
                    {timeSettingsDisplay}
                  </div>
                </div>

              <div className="row-span-1 grid grid-cols-2">
                <div onClick={defaultSettings} className="bg-gray-600 hover:bg-gray-700 cursor-pointer border border-gray-900 col-span-1 text-white flex justify-center items-center">Default</div>
                <div onClick={toggleShowSettings} className="bg-gray-600 hover:bg-gray-700 cursor-pointer border border-gray-900 col-span-1 text-white flex justify-center items-center">Close</div>
              </div>
            </div>
            <div onClick={toggleShowSettings} className="fixed inset-0 h-full w-full fixed z-50 bg-black opacity-60"></div>
          </>
        ) : null}
      </>
    );
  }

export default SettingsModal;