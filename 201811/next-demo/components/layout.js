import React, {Fragment} from 'react'
import Head from 'next/head'
import Header from './header'

export default ({title, children}) => (
  <Fragment>
    <Head>
      <title>my next demo</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"></meta>
      <meta charSet="utf-8"/>
      <link rel="stylesheet" href="/_next/static/style.css"/>

    </Head>
    <Header title={title}/>
    <div className='content-container'>
      {children}
    </div>
  </Fragment>
);
