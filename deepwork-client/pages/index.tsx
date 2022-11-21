import Head from 'next/head'
import Pomodoro from '../components/Pomodoro'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Deep Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Pomodoro />
      </main>

      <footer>
      </footer>
    </div>
  )
}
