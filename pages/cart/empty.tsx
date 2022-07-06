import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";
import Layout from "../../components/Layout";

const EmptyPage = () => {
  return (
    <Layout title="Empty cart" description="No products in the cart">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 80 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Your cart is empty</Typography>
          <NextLink href="/" passHref>
            <Link typography="h4" color="secondary">
              Return
            </Link>
          </NextLink>
        </Box>
      </Box>
    </Layout>
  );
};

export default EmptyPage;
