import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import AdminNavbar from '../AdminNavbar';
import { SideMenu } from '../SideMenu';

type Props = {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
  children: ReactNode;
};

const AdminLayout = ({ subTitle, title, icon, children }: Props) => {
  return (
    <>
      <AdminNavbar />

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            <>
              {icon}
              {title}
            </>
          </Typography>
          <Typography variant="h2">{subTitle}</Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};

export default AdminLayout;
