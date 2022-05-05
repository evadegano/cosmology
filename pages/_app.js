import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import en from '../locales/en'
import fr from '../locales/fr'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const { locale } = router
  const lang = locale === 'en' ? en : fr

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} lang={lang} />
    </SessionProvider>
  )
}

export default MyApp
