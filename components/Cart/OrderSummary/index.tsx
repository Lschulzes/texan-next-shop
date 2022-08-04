import { Divider, Grid, Typography } from '@mui/material';
import { useCart } from '../../../context';
type OrderSummaryData = {
  discount: number;
  subTotal: number;
  quantity: number;
  total: number;
};
type OrderSummaryProps = {
  data?: OrderSummaryData;
};

const OrderSummary = ({ data }: OrderSummaryProps) => {
  const { discount, subTotal, quantity, total } = useCart();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{data?.quantity || quantity}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${data?.subTotal || subTotal}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Discounts (
          {(+((data?.discount || 0) / (data?.subTotal || 0) || process.env.NEXT_PUBLIC_DISCOUNT || 0) * 100).toFixed(0)}
          %)
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${formatToTwoDecimal(data?.discount || discount)}</Typography>
      </Grid>

      <Divider sx={{ mt: 5 }} />

      <Grid item xs={6}>
        <Typography>Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          <strong>${formatToTwoDecimal(data?.total || total)}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;

const formatToTwoDecimal = (number: number) => (Math.round(number * 100) / 100).toFixed(2);
