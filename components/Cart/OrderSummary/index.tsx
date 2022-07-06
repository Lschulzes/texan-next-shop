import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$155.36</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Discounts (10%)</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$15.54</Typography>
      </Grid>

      <Divider sx={{ mt: 5 }} />

      <Grid item xs={6}>
        <Typography>Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          <strong>$140.00</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
