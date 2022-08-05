import { IncomingMessage } from 'http';
import mongoose, { ConnectionStates } from 'mongoose';
import { getToken } from 'next-auth/jwt';
import { ProductModel, UserModel } from '../models';
import OrderModel from '../models/OrderModel';
import { Stats } from '../pages/admin';
import { AppError } from '../utils';

type Connection = { status: ConnectionStates };

const mongoConnection: Connection = {
  status: ConnectionStates.disconnected,
};

export const connect = async () => {
  if (mongoose.connections.length > 0) {
    mongoConnection.status = mongoose.connections[0].readyState;

    if (mongoConnection.status === 1) return mongoose.connections[0];

    await mongoose.disconnect();
  }

  mongoConnection.status = ConnectionStates.connecting;

  await mongoose.connect(process.env.MONGO_URL ?? '');

  mongoConnection.status = ConnectionStates.connected;
};

export const disconnect = async () => {
  if (mongoConnection.status) return await mongoose.disconnect();
};

export const getStats = async (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
): Promise<Stats> => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' });

  if (!token || (token as { user: { role: string } }).user.role !== 'admin') throw new AppError('Unauthorized', 403);

  await connect();
  const clients = await UserModel.count({ role: 'client' });
  const lowInStock = await ProductModel.count({ inStock: { $lte: 3 } });
  const amountOfProducts = await ProductModel.count();
  const quantityOfOrders = await OrderModel.count();
  const paid = await OrderModel.count({ isPaid: true });
  await disconnect();

  return {
    clients,
    lowInStock,
    nonExistant: 0,
    paid,
    pendent: quantityOfOrders - paid,
    products: amountOfProducts,
    quantityOfOrders,
  };
};
