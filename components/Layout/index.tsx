import Head from 'next/head';
import { ReactNode } from 'react';
import Navbar from '../Navbar';
import { SideMenu } from '../SideMenu';

type Props = {
  title: string;
  description: string;
  imageFullUrl?: string;
  children: ReactNode;
};

const Layout = ({ description, title, imageFullUrl, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <Navbar />

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px',
        }}
      >
        {children}
      </main>

      <footer></footer>
    </>
  );
};

export default Layout;
