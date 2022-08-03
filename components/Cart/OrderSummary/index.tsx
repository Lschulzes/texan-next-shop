import { Divider, Grid, Typography } from '@mui/material';
import { useCart } from '../../../context';

const OrderSummary = () => {
  const { discount, subTotal, quantity, total } = useCart();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{quantity}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${subTotal}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Discounts ({+(process.env.NEXT_PUBLIC_DISCOUNT || 0) * 100}%)</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${formatToTwoDecimal(discount)}</Typography>
      </Grid>

      <Divider sx={{ mt: 5 }} />

      <Grid item xs={6}>
        <Typography>Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          <strong>${formatToTwoDecimal(total)}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;

const formatToTwoDecimal = (number: number) => (Math.round(number * 100) / 100).toFixed(2);
