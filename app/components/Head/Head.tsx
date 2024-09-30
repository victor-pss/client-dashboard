import React from 'react';
import Head from 'next/head';

export default function Header({pageTitle}: {pageTitle: string} ) {

  return (
    <Head title={pageTitle}>
    </Head>
  )
}
