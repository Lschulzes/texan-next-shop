import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { ProductModel } from '../../../models';
import { AppError } from '../../../utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getProducts(res);
    case 'PATCH':
      return await updateProduct(req, res);
    case 'POST':
      return await createProduct(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { images = [] } = req.body as IProduct;
    if (images.length < 2) throw new AppError('A product needs to have at least 2 images', 400);

    await db.connect();
    const productWithSlug = await ProductModel.findOne({ slug: req.body.slug });
    if (productWithSlug) throw new AppError('Slug already exists', 401);
    const product = await ProductModel.create(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    res.status((error as AppError).statusCode).send((error as AppError).message);
  }
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id = '', images = [] } = req.body as IProduct;
    if (!isValidObjectId(_id)) throw new AppError('Id is not valid', 400);
    if (images.length < 2) throw new AppError('A product needs to have at least 2 images', 400);

    await db.connect();
    const product = await ProductModel.findById(_id);
    if (!product) throw new AppError('No product with such id', 404);
    const updatedProduct = await product.update(req.body);
    await db.disconnect();

    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status((error as AppError).statusCode).send((error as AppError).message);
  }
};

const getProducts = async (res: NextApiResponse) => {
  await db.connect();
  const products = await ProductModel.find().sort({ title: 'asc' });
  await db.disconnect();

  return res.status(200).json(products);
};
