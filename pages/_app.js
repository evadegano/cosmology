import '../styles/globals.css'
import '../styles/fonts.css'
import { ContextProvider } from '../context'
import { SWRConfig } from 'swr'


function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{fetcher: url => fetch(url).then(r => r.json())}}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SWRConfig>
  )
}

export default MyApp
