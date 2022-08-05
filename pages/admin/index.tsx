import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { texanAPI } from '../../api';
import AdminLayout from '../../components/AdminLayout';
import { getStats } from '../../database/db';

export type Stats = {
  quantityOfOrders: number;
  paid: number;
  pendent: number;
  nonExistant: number;
  lowInStock: number;
  clients: number;
  products: number;
};

type DashboardProps = { stats: Stats };

const DashboardPage = ({ stats }: DashboardProps) => {
  const [currentStats, setCurrentStats] = useState<Stats>();
  const [refreshIn, setRefreshIn] = useState<number>(15);

  const { clients, lowInStock, nonExistant, paid, pendent, products, quantityOfOrders } = currentStats || stats;

  useEffect(() => {
    if (refreshIn < 1) {
      setRefreshIn(60);
      texanAPI.get<Stats>('/stats').then(({ data }) => setCurrentStats(data));
      return;
    }

    const timer = setInterval(() => setRefreshIn((cur) => --cur), 1000);

    return () => clearInterval(timer);
  }, [refreshIn]);

  return (
    <AdminLayout title="Dashboard" subTitle="General Stats" icon={<DashboardOutlined />}>
      <Grid container spacing={2} pt="2rem">
        <SummaryTile
          title="Amount of orders"
          amount={quantityOfOrders}
          icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title="Paid orders"
          amount={paid}
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title="Pendent orders"
          amount={pendent}
          icon={<CreditCardOutlined color="primary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile title="Clients" amount={clients} icon={<GroupOutlined color="error" sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title="Products"
          amount={products}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title="No inventory"
          amount={nonExistant}
          icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title="Low In Stock"
          amount={lowInStock}
          icon={<ProductionQuantityLimitsOutlined color="error" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title="Refresh In"
          amount={refreshIn}
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async ({ req }) => {
  const stats = await getStats(req);
  return { props: { stats } };
};

export default DashboardPage;

type SummaryTileProps = {
  title: string;
  amount: number;
  icon: JSX.Element;
};

const SummaryTile = ({ amount, title, icon }: SummaryTileProps) => {
  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{
          display: 'flex',
          boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
      >
        <CardContent sx={{ wwidth: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {icon}
        </CardContent>

        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4">{amount}</Typography>
          <Typography variant="caption">{title}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
