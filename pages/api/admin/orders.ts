import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import OrderModel from '../../../models/OrderModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getOrders(res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const getOrders = async (res: NextApiResponse) => {
  await db.connect();
  const orders = await OrderModel.find().sort({ createdAt: 'desc' }).populate('user', 'name email').lean();
  await db.disconnect();

  return res.status(200).json(orders);
};
