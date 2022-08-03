import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import CartList from '../../components/Cart/CartList';
import OrderSummary from '../../components/Cart/OrderSummary';
import FullScreenLoading from '../../components/FullScreenLoading';
import Layout from '../../components/Layout';
import { useCart } from '../../context';
import useUser from '../../context/Auth/useUser';

const SummaryPage = () => {
  const { billingAddress, createOrder, products } = useCart();
  const { user } = useUser();

  if (!billingAddress) return <FullScreenLoading />;

  const onCreateOrder = async () => {
    if (!user) return;

    await createOrder({ billingAddress, items: products, user: user._id });
  };

  return (
    <Layout title="Summary of the order" description="Summary of the order">
      <Typography variant="h1" component="h1">
        Summary of the order
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary (3 products)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Delivery Address</Typography>

                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>
                {billingAddress.name} {billingAddress.lastName}
              </Typography>

              <Typography>{billingAddress.address}</Typography>

              <Typography>{billingAddress.country}</Typography>

              <Typography>{billingAddress.phoneNumber}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box mt={3}>
                <Button color="secondary" onClick={onCreateOrder} className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SummaryPage;
