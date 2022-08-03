import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
import Layout from '../../components/Layout';

const columns: Array<GridColDef> = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'full_name', headerName: 'Full Name', width: 100 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'If the order has been paid',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="paid" variant="outlined" />
      ) : (
        <Chip color="error" label="not paid" variant="outlined" />
      );
    },
  },
  {
    field: 'details',
    headerName: 'Details',
    description: 'Click to see the details',
    width: 100,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Details</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: '2', paid: true, full_name: 'Lucas Silva' },
  { id: '3', paid: false, full_name: 'Douglas Silva' },
  { id: '21', paid: false, full_name: 'Fierro Herrera' },
  { id: '1', paid: false, full_name: 'Emin Hayes' },
  { id: '7', paid: false, full_name: 'Jordan Still' },
  { id: '81', paid: false, full_name: 'Willy John' },
  { id: '9', paid: false, full_name: 'Less Mianto Yjar' },
];

const HistoryPage = () => {
  return (
    <Layout title="History of orders" description="History of orders">
      <Typography variant="h1" component="h1">
        History of orders
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HistoryPage;
