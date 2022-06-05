import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Noto+Serif+JP:wght@600&family=DM+Serif+Text&family=Montserrat:wght@500&display=swap" 
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