import { UserModel } from "./../../../models/UserModel";
import { connect } from "./../../../database/db";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { signToken } from "../../../utils";
import { handleMultipleMongooseErrors } from "../../../utils/errors";

type Data = {
  message: string;
  status?: string;
  token?: string;
  user?: Partial<IUser>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return await registerUser(req, res);
  }

  res.status(400).json({ message: "route not found!" });
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  try {
    await db.connect();
    const newUser = await UserModel.create({
      email: email.toLowerCase(),
      password,
      role: "client",
      name,
    });
    await db.disconnect();

    const { _id, role } = newUser;

    const token = signToken(_id, email);

    res.setHeader("set-cookie", `token=${token}; path=/; samesite=lax;`);

    return res.status(200).json({
      message: "User registered",
      token,
      user: { email, role, name },
    });
  } catch (err) {
    const AppError = handleMultipleMongooseErrors(err);

    return res
      .status(AppError.statusCode)
      .json({ message: AppError.message, status: AppError.status });
  }
};
