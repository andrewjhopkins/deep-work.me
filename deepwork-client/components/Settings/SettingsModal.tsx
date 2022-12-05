import React, { useContext } from 'react'
import { PomodoroContext } from "../../context/PomodoroContext";

const SettingsModal = () =>  {

    const { state, dispatch } = useContext(PomodoroContext);
    const { showSettings } = state;

    const toggleShowSettings = () => {
        dispatch({...state, type: "toggle_show_settings"});
    }

    return (
      <>
        {showSettings ? (
          <>
            <div style={{ zIndex: 999}} className="fixed inset-0 mx-auto my-32 h-64 w-96 border-2 z-10 border-2 border-gray-900 bg-gray-800 rounded-lg grid grid-rows-6">
                <div className="row-span-1 text-white text-center text-1xl border-b">
                  <div className="my-2">Settings</div>
                </div>

                <div className="row-span-4 grid grid-rows-4 border-b">

                  <div className="row-span-1 text-white text-1xl text-center my-4">Time (minutes)</div>
                  <div className="row-span-3 grid grid-cols-6 my-4">
                    <div className="col-span-2 grid grid-rows-4">

                      <div className="row-span-1 text-white text-center">
                        Pomodoro
                      </div>
                      <div className="row-span-3 text-white text-center grid grid-cols-6 mt-2">
                        <div className="col-span-1"><span className="ml-3">-</span></div>
                        <text className="col-span-4">25:00</text>
                        <div className="col-span-1"><span className="mr-3">+</span></div>
                      </div>
                    </div>


                    <div className="col-span-2 grid grid-rows-4">
                      <div className="row-span-1 text-white text-center">
                        Short Break
                      </div>
                      <div className="row-span-3 text-white text-center grid grid-cols-6 mt-2">
                        <div className="col-span-1"><span className="ml-3">-</span></div>
                        <text className="col-span-4">25:00</text>
                        <div className="col-span-1"><span className="mr-3">+</span></div>
                      </div>
                    </div>


                    <div className="col-span-2 grid grid-rows-4">
                      <div className="row-span-1 text-white text-center">
                        Long Break
                      </div>
                      <div className="row-span-3 text-white text-center grid grid-cols-6 mt-2">
                        <div className="col-span-1"><span className="ml-3">-</span></div>
                        <text className="col-span-4">25:00</text>
                        <div className="col-span-1"><span className="mr-3">+</span></div>
                      </div>
                    </div>

                  </div>
                </div>

              <div className="row-span-1 grid grid-cols-2">
                <div className="col-span-1 text-white flex justify-center items-center">Default</div>
                <div className="col-span-1 text-white flex justify-center items-center">Close</div>
              </div>
            </div>
            <div onClick={toggleShowSettings} className="fixed inset-0 h-full w-full fixed z-50 bg-black opacity-60"></div>
          </>
        ) : null}
      </>
    );
  }

export default SettingsModal;