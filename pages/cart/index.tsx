import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import CartList from "../../components/Cart/CartList";
import OrderSummary from "../../components/Cart/OrderSummary";
import Layout from "../../components/Layout";

const CartPage = () => {
  return (
    <Layout title="Cart" description="No products in the cart">
      <Typography variant="h1" component="h1">
        Cart
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box mt={3}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CartPage;
