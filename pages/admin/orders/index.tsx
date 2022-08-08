import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import AdminLayout from '../../../components/AdminLayout';
import { IOrder } from '../../../interfaces';

const columns: Array<GridColDef> = [
  { field: 'id', headerName: 'Order ID', width: 120, renderCell: ({ row }) => row.id.slice(0, 10) },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'fullName', headerName: 'Full Name', width: 200 },
  { field: 'total', headerName: 'Amount', width: 90, align: 'center' },
  {
    field: 'isPaid',
    headerName: 'Paid',
    width: 100,
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Payed" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendent" color="error" />
      );
    },
  },
  { field: 'quantity', headerName: 'No. Products', align: 'center' },
  {
    field: 'check',
    headerName: 'See Order',
    width: 100,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <Link href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          See
        </Link>
      );
    },
    align: 'center',
  },
];

const OrdersPage = () => {
  const { data, error } = useSWR<Array<IOrder>>('/api/admin/orders');

  if (!data || error) return <></>;

  const rows = data.map(({ _id, isPaid, total, user, orderItems }) => {
    if (!user || typeof user === 'string') return;

    return {
      id: _id,
      total,
      isPaid,
      fullName: user.name,
      email: user.email,
      quantity: orderItems.length,
    };
  });

  return (
    <AdminLayout title="Orders" subTitle="Orders Management" icon={<ConfirmationNumberOutlined />}>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
