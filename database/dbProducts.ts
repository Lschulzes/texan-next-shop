import { db } from ".";
import { IProduct } from "../interfaces";
import { ProductModel } from "../models";

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(product));
};
