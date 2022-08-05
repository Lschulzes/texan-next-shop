import styled from '@emotion/styled';
import { CreditCardOffOutlined, CreditCardOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { texanAPI } from '../../api';
import CartList from '../../components/Cart/CartList';
import OrderSummary from '../../components/Cart/OrderSummary';
import Layout from '../../components/Layout';
import useUser from '../../context/Auth/useUser';
import { IOrder } from '../../interfaces';
import { getOrderByID } from '../api/orders/[id]';

type OrderPageProps = { order: IOrder };

const OrderPage = ({ order }: OrderPageProps) => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = router.query;

  const { address, country, lastName, name, phoneNumber } = order.billingAddress;
  const { discount, total, subTotal, isPaid } = order;
  const quantity = order.orderItems.length;

  const [hasBeenPaid, setHasBeenPaid] = useState(isPaid);

  const handleSubmitPayment = async () => {
    if (processing || isPaid) return;
    setProcessing(true);
    try {
      const { data: clientSecret } = await texanAPI.post('/payment_intents', { orderId: id });
      const cardElement = elements?.getElement(CardElement);
      if (!cardElement) throw new Error();

      const paymentMethodRes = await stripe?.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name, email: user?.email },
      });

      if (!paymentMethodRes?.paymentMethod) throw new Error();

      const confirmCardPayment = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodRes?.paymentMethod.id,
      });

      if (confirmCardPayment?.paymentIntent?.status === 'succeeded') {
        setHasBeenPaid(true);
      }
    } catch (error) {
      setProcessing(false);
    }
  };

  return (
    <Layout title={`Summary of the order ${id}`} description="Summary of the order">
      <Typography variant="h1" component="h1">
        Order #{id?.slice(0, 10)}
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

              <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
                <h1>Pay</h1>

                {hasBeenPaid ? (
                  <Chip
                    sx={{ mt: '6px' }}
                    label="Paid"
                    variant="outlined"
                    color="success"
                    icon={<CreditCardOutlined />}
                  />
                ) : (
                  <Chip
                    sx={{ mt: '6px' }}
                    label="Payment Pending"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined />}
                  />
                )}
              </Box>

              {!hasBeenPaid && (
                <CardElementContainer>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          color: 'black',
                        },
                      },
                      hidePostalCode: true,
                    }}
                  />
                </CardElementContainer>
              )}

              {!hasBeenPaid && (
                <Button
                  sx={{
                    width: '100%',
                    background: '#333',
                    color: 'white',
                    border: '1px solid white',
                    mt: 2,
                    p: 1,
                    fontSize: '1.2rem',
                    ':hover': {
                      background: 'white',
                      color: '#333',
                      borderColor: '#333',
                    },
                  }}
                  onClick={handleSubmitPayment}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : `Pay $${total}`}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async ({ query, req }) => {
  try {
    const { id } = query;
    const session = await getSession({ req });

    const order = await getOrderByID(id?.toString() || '');

    if (!session || (session?.user as unknown as { _id: string })?._id !== order.user)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    return { props: { order } };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

const CardElementContainer = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;

  & .StripeElement {
    width: 100%;
    padding: 1rem;
  }
`;
