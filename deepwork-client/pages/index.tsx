import Head from 'next/head'
import PomodoroWidget from "../components/Pomodoro/PomodoroWidget"
import LofiPlayerWidget from  "../components/LofiPlayer/LofiPlayerWidget";
import Draggable from "react-draggable";
import Toast from '../components/Toast/Toast';

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/coffee.ico" />
      </Head>
      <main>
        <Draggable
          handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          grid={[25, 25]}
          scale={1}>
          <div className="handle w-96">
            <LofiPlayerWidget />
          </div>
        </Draggable>
        <Draggable
          handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          grid={[25, 25]}
          scale={1}>
          <div className="handle w-96">
            <PomodoroWidget />
          </div>
        </Draggable>
        <Toast />
      </main>
      <footer>
      </footer>
    </div>
  )
}