import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';
import '../styles/styles.css';
import '../styles/custom.css';
import React from 'react';
import { Body } from 'components/Body';

export default function MyApp(props: AppProps): JSX.Element {
  const keywords = 'keywords';
  const description = 'description';

  const title = 'Message Board';

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1 width=device-width" />

        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />

        <title>{title}</title>
      </Head>

      <Body {...props} />
    </div>
  );
}
