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
import { initialData } from "../database/products";
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

      <Grid container spacing={4}>
        {initialData.products.map(({ slug, images, title }) => (
          <Grid item xs={6} sm={4} key={slug}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`products/${images[0]}`}
                  alt={title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;
