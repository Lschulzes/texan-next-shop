import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ItemCounter from "../../components/ItemCounter";
import Layout from "../../components/Layout";
import SizeSelector from "../../components/products/SizeSelector";
import Slideshow from "../../components/Slideshow";
import { initialData } from "../../database/products";
import { useProducts } from "../../hooks";
import { ISize } from "../../interfaces";

const Slug = () => {
  const [currentSize, setCurrentSize] = useState<ISize>();

  const router = useRouter();

  const { slug = null } = router.query;

  const { data } = useProducts(`/products/${slug}`);

  const product = data.data?.[0];

  if (!product) return <div>Error</div>;

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

            <Box my={2} display="flex" alignItems="center">
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter maxNumber={product.inStock} />
              <SizeSelector
                onClick={(size) => setCurrentSize(size)}
                selectedSize={currentSize}
                sizes={product.sizes}
              />
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
