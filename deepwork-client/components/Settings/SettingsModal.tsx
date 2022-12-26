import React, { useContext, useState } from 'react'
import { Context, TimeMode } from "../../context/Context";
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';
import { actionType } from '../../reducers/reducerActionTypes';

const SettingsModal = () =>  {

    const { state, dispatch } = useContext(Context);
    const { showSettings, timeSettings, backgroundEffect } = state;

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

    const timeSettingsDisplay = Object.entries(timeSettings).map(([key, value]) => {
      return (
        <div key={value.name} className="col-span-2 grid grid-rows-4">
          <div className="row-span-1 text-white text-center">
            {value.name}
          </div>
          <div className="row-span-2 text-white grid grid-cols-12 mt-2 mx-2">
            <div onClick={() => updateInitialTime(key as TimeMode, -60)} className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-bold border-gray-300 col-span-3 flex justify-center items-center text-center"><span className="">-</span></div>
            <text className="bg-gray-600 col-span-6 flex justify-center items-center text-center">{formatSecondsIntoMinutesAndSeconds(value.initialTime)}</text>
            <div onClick={() => updateInitialTime(key as TimeMode, 60)} className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white  font-bold col-span-3 flex justify-center items-center text-center"><span className="">+</span></div>
          </div>
          <div className="row-span-1"></div>
        </div>
      );
    });

    const backgroundSettingsDisplay = backgroundEffects.map((background, index) => {
      return (
        <div onClick={() => toggleBackground(background)} key={background} className={`${index == 0 ? "col-start-4" : ""} ${backgroundEffect == background ? "bg-gray-700" : "bg-gray-600 hover:bg-gray-700"} mt-2 mx-1 mb-2 cursor-pointer text-white font-bold border-gray-300 col-span-2 flex justify-center items-center text-center`}><span className="">{background}</span></div>
      );
    });

    return (
      <>
        {showSettings ? (
          <>
            <div style={{ zIndex: 999}} className="fixed inset-0 mx-auto my-32 h-fit w-96 border-2 z-10 border-2 border-gray-900 bg-gray-800 rounded-lg">

                <div className="h-10 text-white text-center text-1xl border-b">
                  <div className="my-2">Settings</div>
                </div>

              <div className="h-64 grid grid-rows-6">
                  <div className="row-span-4 grid grid-rows-4">
                    <div className="row-span-1 text-white text-1xl flex justify-center items-center">Time (minutes)</div>
                    <div className="row-span-3 grid grid-cols-6">
                      {timeSettingsDisplay}
                    </div>
                  </div>

                  <div className="row-span-2 grid grid-rows-6">
                    <div className="row-span-2 text-white text-1xl text-center">Background Effect</div>
                    <div className="row-span-4 grid grid-cols-12">
                      {backgroundSettingsDisplay}
                    </div>
                  </div>
              </div>

              <div className="h-10 grid grid-cols-2">
                <div onClick={defaultSettings} className="bg-gray-600 hover:bg-gray-700 cursor-pointer border border-gray-900 col-span-1 text-white flex justify-center items-center rounded-l-md">Default</div>
                <div onClick={toggleShowSettings} className="bg-gray-600 hover:bg-gray-700 cursor-pointer border border-gray-900 col-span-1 text-white flex justify-center items-center rounded-r-md">Close</div>
              </div>

            </div>
            <div onClick={toggleShowSettings} className="fixed inset-0 h-full w-full fixed z-50 bg-black opacity-60"></div>
          </>
        ) : null}
      </>
    );
  }

export default SettingsModal;