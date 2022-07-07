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
      return await getProduct(req, res);
  }

  res.status(400).json({ message: "route not found!" });
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  await db.connect();
  const products = await ProductModel.find({ slug })
    .select("-_id -__v -createdAt -updatedAt")
    .lean();
  await db.disconnect();

  if (!products.length)
    return res.status(404).json({
      status: "failed",
      message: `No product with the slug:${slug} was found!`,
    });

  return res.status(200).json({ status: "success", data: products });
};
