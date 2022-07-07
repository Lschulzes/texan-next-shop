import { Box } from "@mui/material";
import Head from "next/head";
import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import { SideMenu } from "../SideMenu";

type Props = {
  title: string;
  children: ReactNode;
};

const AuthLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="og:title" content={title} />
      </Head>
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};

export default AuthLayout;