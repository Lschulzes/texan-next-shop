import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/Layout";
import { getIdFromToken } from "../../utils";
import { COUNTRIES } from "../../utils/countries";

const AddressPage = () => {
  return (
    <Layout title="Address" description="Confirm address">
      <Typography variant="h1" component="h1">
        Address
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Last name" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="ZIP code" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              variant="filled"
              label="Country"
              defaultValue={COUNTRIES[0].code}
            >
              {COUNTRIES.map(({ code, name }, i) => (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth />
        </Grid>

        <Box display="flex" mt={4} justifyContent="center" width="100%">
          <Button color="secondary" className="circular-btn" size="large">
            Review Order
          </Button>
        </Box>
      </Grid>
    </Layout>
  );
};

export default AddressPage;
