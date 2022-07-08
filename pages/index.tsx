import {
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import FullScreenLoading from "../components/FullScreenLoading";
import Layout from "../components/Layout";
import ProductList from "../components/products/ProductList";
import { initialData } from "../database/products";
import { useProducts } from "../hooks";
import { IProduct } from "../interfaces";

const Home: NextPage = () => {
  const { products, error, isLoading } = useProducts("/products");

  if (error) return <div>Error</div>;
  if (isLoading) return <FullScreenLoading />;

  return (
    <Layout
      title="Texan-Shop - Home"
      description="Find the best texan products here"
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" mb="1">
        All Products
      </Typography>

      <ProductList products={products.data as Array<IProduct>} />
    </Layout>
  );
};

export default Home;
