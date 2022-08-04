import { CreditCardOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { texanAPI } from '../../api';
import CartList from '../../components/Cart/CartList';
import OrderSummary from '../../components/Cart/OrderSummary';
import FullScreenLoading from '../../components/FullScreenLoading';
import Layout from '../../components/Layout';
import { IOrder } from '../../interfaces';

const OrderPage = () => {
  const [order, setOrder] = useState<IOrder>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    texanAPI.get(`/orders/${id}`).then((res) => {
      if (res.status === 200) {
        return setOrder(res.data.data);
      }
    });
  }, [id]);

  if (!order) return <FullScreenLoading />;

  const { address, country, lastName, name, phoneNumber } = order.billingAddress;
  const { discount, total, subTotal } = order;
  const quantity = order.orderItems.length;

  return (
    <Layout title={`Summary of the order ${id}`} description="Summary of the order">
      <Typography variant="h1" component="h1">
        Order #{id?.slice(0, 6)}
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={7}>
          <CartList orderItems={order.orderItems} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary ({quantity} products)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Delivery Address</Typography>

                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>
                {name} {lastName}
              </Typography>

              <Typography>{address}</Typography>

              <Typography>{country}</Typography>

              <Typography>{phoneNumber}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary data={{ discount, quantity, subTotal, total }} />

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
