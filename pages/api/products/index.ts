import { FilterQuery } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "../../../database";
import { IProduct, ProductGender } from "../../../interfaces";
import { ProductModel } from "../../../models";

export type APIProductsResponse = {
  message?: string;
  status?: "failed" | "success";
  results?: number;
  data?: Array<IProduct>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIProductsResponse>
) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
  }

  res.status(400).json({ message: "route not found!" });
}

const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<APIProductsResponse>
) => {
  const { gender = null, search = null } = req.query;

  let condition: FilterQuery<IProduct> = {};

  if (gender && isValidGender(gender)) {
    condition = { gender };
  }

  if (search) {
    condition.$text = { $search: search.toString().toLocaleLowerCase() };
  }

  await db.connect();
  const products = await ProductModel.find(condition)
    .select("-_id -__v -createdAt -updatedAt")
    .lean();
  await db.disconnect();

  return res
    .status(200)
    .json({ status: "success", results: products.length, data: products });
};

const isValidGender = (
  gender: ProductGender | string | Array<string>
): gender is ProductGender => {
  return SHOP_CONSTANTS.validGenders.includes(gender as ProductGender);
};
