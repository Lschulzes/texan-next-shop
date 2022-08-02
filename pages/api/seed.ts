import { ProductModel } from "./../../models/ProductModel";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { initialData } from "../../database/seed-data";
import { IProduct, IUser } from "../../interfaces";
import UserModel from "../../models/UserModel";

type Data = {
  message: string;
  data?: { products: Array<IProduct>; users: Array<IUser> };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // if (process.env.NODE_ENV !== "development") {
  //   return res.status(401).json({ message: "Endpoint Unauthorized" });
  // }

  switch (req.method) {
    case "POST":
      return await seedDB(res);
    case "GET":
      return await getDB(res);
  }

  res.status(400).json({ message: "route not found!" });
}

const getDB = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await ProductModel.find();
  const users = await UserModel.find();
  await db.disconnect();

  return res
    .status(200)
    .json({ message: "Products", data: { products, users } });
};

const seedDB = async (res: NextApiResponse<Data>) => {
  await db.connect();

  await ProductModel.deleteMany();
  await ProductModel.insertMany(initialData.products);

  await UserModel.deleteMany();
  await UserModel.insertMany(initialData.users);

  await db.disconnect();

  return res.status(200).json({ message: "Database seeded!" });
};
