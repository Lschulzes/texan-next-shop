import { Typography } from "@mui/material";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import FullScreenLoading from "../../components/FullScreenLoading";
import Layout from "../../components/Layout";
import ProductList from "../../components/products/ProductList";
import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces";

const CategoryPage: NextPage = (ctx) => {
  const router = useRouter();

  const { gender } = router.query;

  const { products, error, isLoading } = useProducts(
    `/products?gender=${gender}`
  );

  if (error) return <div>Error</div>;
  if (isLoading) return <FullScreenLoading />;

  return (
    <Layout
      title="Texan-Shop - CategoryPage"
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

export default CategoryPage;
