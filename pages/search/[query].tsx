import {
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import FullScreenLoading from "../../components/FullScreenLoading";
import Layout from "../../components/Layout";
import ProductList from "../../components/products/ProductList";
import { getAllProductsByTerm } from "../../database/dbProducts";
import { initialData } from "../../database/products";
import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces";

type SearchPageProps = {
  products: Array<IProduct>;
};

const SearchPage: NextPage<SearchPageProps> = ({ products }) => {
  const router = useRouter();
  const { query } = router.query;

  return (
    <Layout
      title="Texan-Shop - Search"
      description="Find the best texan products here"
    >
      <Typography variant="h1" component="h1">
        Search Product
      </Typography>
      <Typography variant="h2" mb="1">
        Showing {products.length} results for {`"${query}"`}
      </Typography>

      <ProductList products={products} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  params
) => {
  const { query = "" } = params.query;

  if (query.length === 0)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  const products = await getAllProductsByTerm(String(query));

  return { props: { products } };
};

export default SearchPage;
