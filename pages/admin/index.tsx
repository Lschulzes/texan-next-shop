import { DashboardOutlined } from '@mui/icons-material';
import AdminLayout from '../../components/AdminLayout';

const DashboardPage = () => {
  return (
    <AdminLayout title="Dashboard" subTitle="General Stats" icon={<DashboardOutlined />}>
      <h1>Hello World!</h1>
    </AdminLayout>
  );
};

export default DashboardPage;
