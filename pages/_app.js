import '../styles/globals.css'
import { useRouter } from 'next/router'
import en from '../locales/en'
import fr from '../locales/fr'


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { locale } = router
  const lang = locale === 'en' ? en : fr

  return <Component {...pageProps} lang={lang} />
}

export default MyApp
