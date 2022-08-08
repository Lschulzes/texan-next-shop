import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { ProductModel } from '../../../models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getProducts(res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const getProducts = async (res: NextApiResponse) => {
  await db.connect();
  const products = await ProductModel.find().sort({ title: 'asc' });
  await db.disconnect();

  return res.status(200).json(products);
};
