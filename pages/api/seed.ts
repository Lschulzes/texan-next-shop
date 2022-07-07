import { ProductModel } from "./../../models/ProductModel";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { initialData } from "../../database/products";
import { IProduct } from "../../interfaces";

type Data = {
  message: string;
  data?: Array<IProduct>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(401).json({ message: "Endpoint Unauthorized" });
  }

  switch (req.method) {
    case "POST":
      return await seedDB(res);
    case "GET":
      return await getDB(res);
  }

  res.status(404).json({ message: "route not found!" });
}

const getDB = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await ProductModel.find();
  await db.disconnect();

  return res.status(200).json({ message: "Products", data: products });
};

const seedDB = async (res: NextApiResponse<Data>) => {
  await db.connect();

  await ProductModel.deleteMany();
  await ProductModel.insertMany(initialData.products);

  await db.disconnect();

  return res.status(200).json({ message: "Database seeded!" });
};
