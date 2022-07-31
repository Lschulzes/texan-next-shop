import jwt from "jsonwebtoken";
import { AppError } from "./errors";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED)
    throw new Error("JWT Secret env not found!");

  return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, {
    expiresIn: "30d",
  });
};

export const getIdFromToken = (token: string): Promise<string> => {
  const secret = process.env.JWT_SECRET_SEED || "";
  if (!secret) throw new Error("JWT Secret env not found!");

  return new Promise((res, rej) => {
    try {
      jwt.verify(token, secret, (err, payload) => {
        if (err) throw new AppError("JWT invalid", 400);

        const { _id } = payload as { _id: string };
        res(_id);
      });
    } catch (error) {
      rej(error);
    }
  });
};
