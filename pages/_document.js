import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/AlRagas-Eagng.woff"
          as="font"
          type="font/woff"
          crossOrigin=""
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Sans&family=DM+Serif+Display&family=Montserrat:wght@500&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}