import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import ItemCounter from "../../components/ItemCounter";
import Layout from "../../components/Layout";
import SizeSelector from "../../components/products/SizeSelector";
import Slideshow from "../../components/Slideshow";
import { CartContext } from "../../context";
import {
  getAllProductsSlugs,
  getProductBySlug,
} from "../../database/dbProducts";
import { ICartProduct, IProduct, ISize } from "../../interfaces";

type PageProps = {
  product: IProduct;
};

const Slug: FC<PageProps> = ({ product }) => {
  const router = useRouter();

  const [productForCart, setProductForCart] = useState<ICartProduct>(
    mapProductToCartProduct(product)
  );

  const { addProduct, products } = useContext(CartContext);

  const handleChangeSize = (size: ISize) => {
    setProductForCart((product) => ({ ...product, size }));
  };

  const handleChangeQuantity = (quantity: number) => {
    setProductForCart((product) => ({ ...product, quantity }));
  };

  const handleAddProductToCart = () => {
    if (!productForCart.quantity) return;

    addProduct(productForCart);
    router.push(`/cart`);
  };

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
              <ItemCounter
                onQuantityChange={handleChangeQuantity}
                maxNumber={product.inStock}
                count={productForCart.quantity}
              />
              <SizeSelector
                onChangeSize={handleChangeSize}
                selectedSize={productForCart.size}
                sizes={product.sizes}
              />
            </Box>

            {product.inStock === 0 ? (
              <Chip color="error" label="Not Available" variant="outlined" />
            ) : (
              <Button
                disabled={!productForCart.size}
                color="secondary"
                className="circular-btn"
                onClick={handleAddProductToCart}
              >
                {productForCart.size ? "Add to cart" : "Select a size"}
              </Button>
            )}

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

/************************ */
const mapProductToCartProduct = (product: IProduct) => ({
  _id: product._id,
  gender: product.gender,
  image: product.images[0],
  price: product.price,
  slug: product.slug,
  title: product.title,
  inStock: product.inStock,
  quantity: 1,
  size: undefined,
});
