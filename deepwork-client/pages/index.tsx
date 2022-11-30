import Head from 'next/head'
import PomodoroWidget from "../components/Pomodoro/PomodoroWidget"
import LofiPlayerWidget from  "../components/LofiPlayer/LofiPlayerWidget";
import Draggable from "react-draggable";
import Toast from '../components/Toast/Toast';
import SettingsButton from '../components/Settings/SettingsButton';
import SettingsModal from '../components/Settings/SettingsModal';

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/coffee.ico" />
      </Head>
      <main>
        <SettingsModal />
        <SettingsButton />
        <Draggable
          handle=".handle"
          scale={1}>
          <div className="handle w-96 mx-auto mt-10 cursor-move">
            <PomodoroWidget />
          </div>
        </Draggable>
        <Draggable
          handle=".handle"
          scale={1}>
          <div className="w-96 mx-auto my-0 mt-5">
            <LofiPlayerWidget />
          </div>
        </Draggable>
        <Toast />
      </main>
      <footer>
      </footer>
    </div>
  )
}