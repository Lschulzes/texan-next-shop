import { Box, CircularProgress } from '@mui/material';
import Layout from '../Layout';

export const FullScreenLoading = () => {
  return (
    <Layout title="loading" description="loading">
      <Box display="flex" alignItems="center" justifyContent="center" height="calc(100vh - 200px)" width="100%">
        <CircularProgress />
      </Box>
    </Layout>
  );
};

export default FullScreenLoading;
