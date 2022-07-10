import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React, { FC, useState } from "react";
import ItemCounter from "../../components/ItemCounter";
import Layout from "../../components/Layout";
import SizeSelector from "../../components/products/SizeSelector";
import Slideshow from "../../components/Slideshow";
import {
  getAllProductsSlugs,
  getProductBySlug,
} from "../../database/dbProducts";
import { IProduct, ISize } from "../../interfaces";

type PageProps = {
  product: IProduct;
};

const Slug: FC<PageProps> = ({ product }) => {
  const [currentSize, setCurrentSize] = useState<ISize>();

  if (!product) return <div>No product found</div>;

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

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   query,
// }) => {
//   const { slug = "" } = query;

//   const product = await getProductBySlug(String(slug));

//   if (!product)
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };

//   return { props: { product } };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllProductsSlugs();

  if (!slugs) return { paths: [], fallback: true };

  const paths = slugs.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await getProductBySlug(slug);

  if (!product)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return { props: { product }, revalidate: 60 * 60 * 24 };
};

export default Slug;
