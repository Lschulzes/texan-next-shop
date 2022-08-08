import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Button, CardMedia, Grid, Link } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
import useSWR from 'swr';
import AdminLayout from '../../../components/AdminLayout';
import { IProduct } from '../../../interfaces';
import { getImageUrl } from './[slug]';

const columns: Array<GridColDef> = [
  {
    field: 'image',
    headerName: 'Image',
    width: 120,
    renderCell: ({ row }: GridValueGetterParams) => (
      <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
        <CardMedia sx={{ cursor: 'pointer' }} component="img" image={getImageUrl(row.image)} />
      </a>
    ),
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    renderCell: ({ row }: GridValueGetterParams) => (
      <NextLink href={`/admin/products/${row.slug}`} passHref>
        <Link underline="always">{row.title}</Link>
      </NextLink>
    ),
  },
  { field: 'gender', headerName: 'Gender', width: 200 },
  { field: 'total', headerName: 'Amount', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'sizes', headerName: 'Sizes', width: 150 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<Array<IProduct>>('/api/admin/products');

  if (!data || error) return <></>;

  const rows = data.map(({ _id, gender, images, price, sizes, slug, title, type }) => {
    return {
      id: _id,
      title,
      gender,
      image: images[0],
      type,
      price,
      sizes: sizes.join(', '),
      slug,
    };
  });

  return (
    <AdminLayout title="products" subTitle={`Management of ${data.length} Products`} icon={<CategoryOutlined />}>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color="secondary" href="/admin/products/new">
          Create Product
        </Button>
      </Box>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
