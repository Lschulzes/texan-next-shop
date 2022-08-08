import { CategoryOutlined } from '@mui/icons-material';
import { CardMedia, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import AdminLayout from '../../components/AdminLayout';
import { IProduct } from '../../interfaces';

const columns: Array<GridColDef> = [
  {
    field: 'image',
    headerName: 'Image',
    width: 120,
    renderCell: ({ row }: GridValueGetterParams) => (
      <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
        <CardMedia sx={{ cursor: 'pointer' }} component="img" className="fadeIn" image={`/products/${row.image}`} />
      </a>
    ),
  },
  { field: 'title', headerName: 'Title', width: 200 },
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
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
