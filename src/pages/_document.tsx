import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600,700,800&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Nunito:400,400i,600,600i,700|Source+Sans+Pro:600,700,700i&display=swap"
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
}

export default CustomDocument
