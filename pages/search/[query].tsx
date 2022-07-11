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
import {
  getAllProducts,
  getAllProductsByTerm,
} from "../../database/dbProducts";
import { initialData } from "../../database/products";
import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces";

type SearchPageProps = {
  products: Array<IProduct>;
  successfulQuery: boolean;
  query: string;
};

const SearchPage: NextPage<SearchPageProps> = ({
  products,
  successfulQuery,
  query,
}) => {
  return (
    <Layout
      title="Texan-Shop - Search"
      description="Find the best texan products here"
    >
      <Typography variant="h1" component="h1" textTransform="capitalize">
        Search Product
      </Typography>
      {successfulQuery ? (
        <Typography variant="h2" mb="1" textTransform="capitalize">
          Showing {products.length} results for {`"${query}"`}
        </Typography>
      ) : (
        <Typography variant="h2" mb="1">
          No products found with the term of {`"${query}"`}, checkout some other
          ones bellow
        </Typography>
      )}

      <ProductList products={products} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  params
) => {
  const { query = "" } = params.query as { query: string };

  if (query.length === 0)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  let products = await getAllProductsByTerm(String(query));

  const successfulQuery = products.length > 0;

  if (!successfulQuery) products = await getAllProducts();

  return { props: { products, successfulQuery, query } };
};

export default SearchPage;
