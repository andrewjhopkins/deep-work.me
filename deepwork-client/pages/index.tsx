import {useContext} from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import Head from 'next/head'
import PomodoroWidget from '../components/Pomodoro/PomodoroWidget'
import Draggable from "react-draggable";
import Toast from '../components/Toast/Toast';

export default function Home() {
  const { state, dispatch } = useContext(PomodoroContext);
  const { toastMessage } = state;

  return (
    <div>
      <Head>
        <title>Deep Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Draggable
          handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          grid={[25, 25]}
          scale={1}>
          <div className="handle">
            <PomodoroWidget />
          </div>
        </Draggable>
        <Toast message={toastMessage} />
      </main>
      <footer>
      </footer>
    </div>
  )
}