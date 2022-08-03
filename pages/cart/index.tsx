import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CartList from '../../components/Cart/CartList';
import OrderSummary from '../../components/Cart/OrderSummary';
import Layout from '../../components/Layout';
import { useCart } from '../../context';

const CartPage = () => {
  const { quantity, isLoading } = useCart();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && quantity === 0) push('/cart/empty');
  }, [isLoading, quantity, push]);

  if (isLoading || quantity === 0) return <></>;

  return (
    <Layout title="Cart" description={`${quantity === 0 ? 'No products' : quantity} item(s) in the cart`}>
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
                <Button color="secondary" className="circular-btn" fullWidth href="/checkout/address">
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
