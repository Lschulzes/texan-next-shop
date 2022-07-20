import bcrypt from "bcryptjs";
import { UserModel } from "./../../../models/UserModel";
import { connect } from "./../../../database/db";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";

type Data = {
  message: string;
  token?: string;
  user?: Partial<IUser>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return await loginUser(req, res);
  }

  res.status(400).json({ message: "route not found!" });
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;
  console.log(email);

  await db.connect();
  const user = await UserModel.findOne({ email });
  await db.disconnect();
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(400).json({ message: "Email or password is incorrect" });

  const { role, name } = user;

  return res.status(200).json({
    message: "User logged in",
    token: "",
    user: { email, role, name },
  });
};
