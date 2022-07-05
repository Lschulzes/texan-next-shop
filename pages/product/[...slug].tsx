import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Layout from "../../components/Layout";
import Slideshow from "../../components/Slideshow";
import { initialData } from "../../database/products";

const product = initialData.products[0];

const Slug = () => {
  return (
    <Layout title={product.title} description={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <Slideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h2" component="h2">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {product.price}
            </Typography>

            <Box my={2}>
              <Typography variant="subtitle2">Quantity</Typography>
              {/* item counter */}
            </Box>

            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            {/* <Chip label="Not available" color="error" variant="outlined" /> */}

            <Box mt={3}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Slug;
