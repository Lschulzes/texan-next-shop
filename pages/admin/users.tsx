import { PeopleOutlined } from '@mui/icons-material';
import { Grid, MenuItem, Select, Snackbar } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { texanAPI } from '../../api';
import AdminLayout from '../../components/AdminLayout';
import { IUser, UserRoles, UserRolestype } from '../../interfaces';

export type Stats = {
  quantityOfOrders: number;
  paid: number;
  pendent: number;
  nonExistant: number;
  lowInStock: number;
  clients: number;
  products: number;
};

const UsersPage = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [users, setUsers] = useState<Array<IUser>>();

  const { data, error } = useSWR<Array<IUser>>('/api/admin/users');

  if (!data || error) return <></>;

  const dataToMap = users || data;

  const rows = dataToMap.map(({ _id, name, email, role }) => ({
    id: _id,
    name,
    role,
    email,
  }));

  const onRoleUpdated = async (userId: string, role: UserRolestype) => {
    try {
      await texanAPI.put('/admin/users', { userId, role });
      const updatedUsers = dataToMap.map((user) => ({ ...user, role: user._id === userId ? role : user.role }));
      setUsers(updatedUsers);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setToastMessage(String(error.response?.data) || '');
      }
    }
  };

  const columns: Array<GridColDef> = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 180,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            value={row.role}
            label="Role"
            sx={{ width: '200px' }}
          >
            {(Object.keys(UserRoles) as Array<keyof typeof UserRoles>).map((key) => (
              <MenuItem key={key} value={UserRoles[key]}>
                {UserRoles[key]}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <AdminLayout title="Users" subTitle="Users Management" icon={<PeopleOutlined />}>
      <Snackbar
        open={!!toastMessage.length}
        autoHideDuration={6000}
        onClose={() => setToastMessage('')}
        message={toastMessage}
      />
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
