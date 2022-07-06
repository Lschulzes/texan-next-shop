import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import Layout from "../../components/Layout";

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
            <Select variant="filled" label="Country" value={1}>
              <MenuItem value={1}> USA</MenuItem>
              <MenuItem value={2}> Canada</MenuItem>
              <MenuItem value={3}> México</MenuItem>
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
