import Head from 'next/head'
import PomodoroWidget from '../components/PomodoroWidget'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Deep Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PomodoroWidget />
      </main>

      <footer>
      </footer>
    </div>
  )
}
