import type { AppProps } from 'next/app'
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <nav id="navigation" className="hover:cursor-pointer">
    <Navigation/>
  </nav>
  <Component {...pageProps} />
  <Footer/>
  </>
  )
}