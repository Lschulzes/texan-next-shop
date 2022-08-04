import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import { IOrder } from '../../interfaces';
import { getUserOrders } from '../api/orders/[id]';

type HistoryPageProps = { orders: Array<IOrder> };

const HistoryPage = ({ orders }: HistoryPageProps) => {
  const rows = orders.map((order, i) => ({
    id: i + 1,
    paid: order.isPaid,
    full_name: `${order.billingAddress.name} ${order.billingAddress.lastName}`,
    orderId: order._id,
  }));

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

export const getServerSideProps: GetServerSideProps<HistoryPageProps> = async ({ req }) => {
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const orders = await getUserOrders((session.user as { _id: string })._id);

  return { props: { orders } };
};

export default HistoryPage;

const columns: Array<GridColDef> = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'full_name', headerName: 'Full Name', width: 200 },
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
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">Details</Link>
        </NextLink>
      );
    },
  },
];
