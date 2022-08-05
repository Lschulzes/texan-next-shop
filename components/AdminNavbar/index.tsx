import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';
import { UIContext } from '../../context';

const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UIContext);

  return (
    <nav>
      <AppBar>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography color="black" variant="h6">
                Texan |
              </Typography>
              <Typography color="black" variant="h6" fontWeight="100" ml={0.5}>
                Shop
              </Typography>
            </Link>
          </NextLink>

          <Box flex={1} />

          <Button onClick={toggleSideMenu}>Menu</Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default AdminNavbar;
