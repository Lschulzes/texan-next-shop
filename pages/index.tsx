import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import ProductList from "../components/products/ProductList";
import { initialData } from "../database/products";
import { IProduct } from "../interfaces";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
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

      <ProductList products={initialData.products as Array<IProduct>} />
    </Layout>
  );
};

export default Home;
