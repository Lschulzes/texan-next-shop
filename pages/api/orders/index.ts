import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { CreateOrderDispatch } from '../../../context';
import { db } from '../../../database';
import { IOrder, IProduct } from '../../../interfaces';
import { ProductModel } from '../../../models';
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
    case 'POST':
      return await createOrder(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<APIOrderResponse>) => {
  try {
    await db.connect();

    const session = (await getSession({ req })) as unknown as { user: { _id: string } };
    if (!session) throw new AppError('No user found!', 403);

    const data = req.body as CreateOrderDispatch;
    const productsIds = data.items.map(({ _id }) => _id);
    const mappedProducts = await getMappedProducts(productsIds);

    const orderItems: CreateOrderDispatch['items'] = getOrderItems(data.items, mappedProducts);
    const subTotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = Number(process.env.NEXT_PUBLIC_DISCOUNT) || 0;

    const order = await OrderModel.create({
      billingAddress: data.billingAddress,
      user: session.user._id,
      orderItems,
      discount,
      subTotal,
      total: subTotal * (1 - discount),
    });
    await db.disconnect();

    return res.status(201).json({ status: 'success', data: order });
  } catch (error) {
    console.error({ error });
    return res.status(400).json({ status: 'failed' });
  }
};

const getOrderItems = (items: CreateOrderDispatch['items'], mappedProducts: { [key: string]: IProduct }) =>
  items.map((item) => {
    const product = mappedProducts[item._id];
    return {
      _id: item._id,
      quantity: item.quantity,
      size: item.size,
      image: product.images[0],
      price: product.price,
      slug: product.slug,
      title: product.title,
    };
  });

const getMappedProducts = async (productsIds: Array<string>) => {
  const products = await ProductModel.find({ _id: productsIds });
  return products.reduce((acc, product) => {
    const { _id, description, gender, images, inStock, price, sizes, slug, tags, title, type } = product;
    acc[_id] = { _id, description, gender, images, inStock, price, sizes, slug, tags, title, type };
    return acc;
  }, {} as { [key: string]: IProduct });
};
