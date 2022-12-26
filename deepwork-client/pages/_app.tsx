import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { PomodoroProvider } from '../context/Context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PomodoroProvider>
        <Component {...pageProps} />
      </PomodoroProvider>
    </>
  )
}
