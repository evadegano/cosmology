import Script from 'next/script'
import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../../styles/Layout.module.css'
import Footer from '../footer/footer'

export const appName = 'Cosmology'

export default function Layout({ lang, children }) {
  const { data: session } = useSession()

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

      <Footer navLinks={lang.footer.navLinks} socialTitle={lang.footer.socialTitle} newsletterText={lang.footer.newsletterText} newsletterButton={lang.footer.newsletterButton} />
    </div>
  )
}