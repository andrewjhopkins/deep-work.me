import Head from 'next/head'
import PomodoroWidget from "../components/Pomodoro/PomodoroWidget"
import LofiPlayerWidget from  "../components/LofiPlayer/LofiPlayerWidget";
import Draggable from "react-draggable";
import Toast from '../components/Toast/Toast';
import SettingsButton from '../components/Settings/SettingsButton';
import SettingsModal from '../components/Settings/SettingsModal';
import { BrowserView, MobileView } from "react-device-detect";
import TaskListWidget from '../components/TaskList/TaskListWidget';
import Canvas from '../components/Canvas/Canvas';
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';

import bg from "/public/background_2.jpg";
import bg2 from "/public/background_5.jpg";

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/coffee.ico" />
      </Head>
      <main style={{ backgroundImage: `url(${theme == "dark" ? bg.src : bg2.src })` }} className="main">
        <Canvas />
        <SettingsModal />
        <SettingsButton />
        <BrowserView>
          <Draggable handle=".handle" scale={1}>
            <div className="w-96 mx-auto mt-20">
              <PomodoroWidget />
            </div>
          </Draggable>

          <Draggable handle=".handle" scale={1}>
            <div className="w-96 mx-auto my-0 mt-5">
              <LofiPlayerWidget />
            </div>
          </Draggable>

          <Draggable handle=".handle" scale={1}>
            <div className="w-96 mx-auto my-0 mt-5">
              <TaskListWidget />
            </div>
          </Draggable>

        </BrowserView>

        <MobileView>
            <div className="handle w-96 mx-auto mt-20 cursor-move">
              <PomodoroWidget />
            </div>
            <div className="w-96 mx-auto my-0 mt-5">
              <LofiPlayerWidget />
            </div>
            <div className="w-96 mx-auto my-0 mt-5">
              <TaskListWidget />
            </div>
        </MobileView>

        <Toast />
      </main>
      <footer>
      </footer>
    </div>
  )
}