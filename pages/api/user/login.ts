import bcrypt from "bcryptjs";
import { UserModel } from "./../../../models/UserModel";
import { connect } from "./../../../database/db";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { signToken } from "../../../utils";

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

  await db.connect();
  const user = await UserModel.findOne({ email }).select(
    "password _id role name"
  );

  await db.disconnect();
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(400).json({ message: "Email or password is incorrect" });

  const { _id, role, name } = user;

  const token = signToken(_id, email);

  res.setHeader(
    "set-cookie",
    `token=${token}; path=/; samesite=lax; httponly;`
  );

  return res.status(200).json({
    message: "User logged in",
    token,
    user: { email, role, name },
  });
};
