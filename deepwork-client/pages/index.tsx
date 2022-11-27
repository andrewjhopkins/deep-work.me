import Head from 'next/head'
import PomodoroWidget from '../components/PomodoroWidget'
import Draggable from "react-draggable";

export default function Home() {
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
      </main>
      <footer>
      </footer>
    </div>
  )
}