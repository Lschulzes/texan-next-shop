import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import FullScreenLoading from '../../components/FullScreenLoading';
import Layout from '../../components/Layout';
import ProductList from '../../components/products/ProductList';
import { useProducts } from '../../hooks';
import { IProduct } from '../../interfaces';

const CategoryPage: NextPage = () => {
  const router = useRouter();

  const { gender = null } = router.query;

  const { data, error, isLoading } = useProducts(`/products?gender=${gender}`);

  if (error) return <div>Error</div>;
  if (isLoading) return <FullScreenLoading />;

  return (
    <Layout
      title={`Texan-Shop - ${gender} clothing page`}
      description={`Find the best texan products for ${gender} here`}
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" mb="1">
        All Products
      </Typography>

      <ProductList products={data.data as Array<IProduct>} />
    </Layout>
  );
};

export default CategoryPage;
