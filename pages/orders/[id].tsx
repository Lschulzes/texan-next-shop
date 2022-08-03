import { CreditCardOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import CartList from '../../components/Cart/CartList';
import OrderSummary from '../../components/Cart/OrderSummary';
import Layout from '../../components/Layout';

const OrderPage = () => {
  return (
    <Layout title="Summary of the order 16515" description="Summary of the order">
      <Typography variant="h1" component="h1">
        Order #16515
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

              <Typography>Lucas Silva</Typography>

              <Typography>321 Main St., NY</Typography>

              <Typography>USA</Typography>

              <Typography>(589) 9855-328</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box mt={3}>
                <h1>Pay</h1>
              </Box>

              {/* <Chip
        sx={{ my: 2 }}
        label="Payment Pending"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}
              <Chip sx={{ my: 2 }} label="Paid" variant="outlined" color="success" icon={<CreditCardOutlined />} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default OrderPage;
