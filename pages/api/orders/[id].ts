import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import OrderModel from '../../../models/OrderModel';
import { AppError } from '../../../utils';

export type APIOrderResponse = {
  message?: string;
  status?: 'failed' | 'success';
  results?: number;
  data?: Array<IOrder> | IOrder;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIOrderResponse>) {
  switch (req.method) {
    case 'GET':
      return await getOrder(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const getOrder = async (req: NextApiRequest, res: NextApiResponse<APIOrderResponse>) => {
  try {
    const { id } = req.query;
    const order = await getOrderByID(id?.toString() || '');
    return res.status(200).json({ status: 'success', data: order });
  } catch (error) {
    const errorClass = error as AppError;
    return res.status(errorClass.statusCode).json({ status: 'failed', message: errorClass.message });
  }
};

export const getOrderByID = async (id: string) => {
  await db.connect();
  const order = await OrderModel.findById(id).lean();
  await db.disconnect();
  if (!order) throw new AppError(`No order with such ID of ${id}`, 404);

  return JSON.parse(JSON.stringify(order));
};

export const getUserOrders = async (userId: string) => {
  await db.connect();
  const order = await OrderModel.find({ user: userId });
  await db.disconnect();

  return JSON.parse(JSON.stringify(order));
};
