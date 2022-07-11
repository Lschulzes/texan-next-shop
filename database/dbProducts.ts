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

export const getAllProductsSlugs = async (): Promise<Array<{
  slug: string;
}> | null> => {
  await db.connect();
  const data = await ProductModel.find().select("slug -_id").lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(data));
};

export const getAllProducts = async (): Promise<Array<IProduct>> => {
  await db.connect();
  const data = await ProductModel.find()
    .select("-_id -__v -createdAt -updatedAt")
    .lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(data));
};

export const getAllProductsByTerm = async (
  term: string
): Promise<Array<IProduct>> => {
  await db.connect();

  const products = await ProductModel.find({
    $text: { $search: term.toLocaleLowerCase() },
  })
    .select("-_id -__v -createdAt -updatedAt")
    .lean();

  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
