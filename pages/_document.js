import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head} = renderPage()
    return { html, head }
  }

  render () {
    return (
     <html>
       <Head>
        <title>CryptoPrice</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:700" />
        <link rel="stylesheet" href="/static/index.css" />
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
