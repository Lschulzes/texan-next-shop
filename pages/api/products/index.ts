import { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "../../../database";
import { IProduct } from "../../../interfaces";
import { ProductModel } from "../../../models";

type Data = {
  message?: string;
  status?: "failed" | "success";
  results?: number;
  data?: Array<IProduct>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
  }

  res.status(400).json({ message: "route not found!" });
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = "all" } = req.query;

  let condition = {};

  if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender };
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
