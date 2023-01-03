import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PomodoroProvider } from '../context/Context'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <PomodoroProvider>
          <Component {...pageProps} />
        </PomodoroProvider>
      </ThemeProvider>
    </>
  )
}
