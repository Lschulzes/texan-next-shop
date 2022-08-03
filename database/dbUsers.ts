import bcrypt from 'bcryptjs';
import { db } from '.';
import { UserModel } from '../models';

export const checkUserEmailPassword = async (email: string, password: string) => {
  await db.connect();
  const user = await UserModel.findOne({ email }).select('password role name _id');
  await db.disconnect();

  if (!user || !bcrypt.compareSync(password, user.password)) return null;

  return { ...user, email };
};
