import Script from 'next/script'
import { useContext } from 'react'
import { Context } from '../../context'
import Head from 'next/head'
import styles from '../../styles/Layout.module.css'
import Footer from '../footer/footer'

export const appName = 'Cosmology'

export default function Layout({ children }) {
  const { lang } = useContext(Context)
  return (
    <div id={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Receive curated personnalized spiritual content on Cosmology"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            appName,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={appName} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {children}

      <Footer appName={appName} lang={lang.footer} />
    </div>
  )
}