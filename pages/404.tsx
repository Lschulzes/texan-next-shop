import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Layout from "../components/Layout";

function Custom404() {
  return (
    <Layout title="Page not found" description="Not to show here">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Typography variant="h1" component="h1" fontSize={60} fontWeight={200}>
          404 <Box display={{ xs: "none", sm: "inline" }}>|</Box>
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          fontSize={60}
          fontWeight={200}
          display={{ xs: "inline", sm: "none" }}
          mt="-3rem"
        >
          ___
        </Typography>
        <Typography ml={0}>No page found here!</Typography>
      </Box>
    </Layout>
  );
}

export default Custom404;
