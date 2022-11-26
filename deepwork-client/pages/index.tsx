import Head from 'next/head'
import MainTask from '../components/MainTask'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Deep Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainTask />
      </main>

      <footer>
      </footer>
    </div>
  )
}
