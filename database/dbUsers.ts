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

export const OAuthoDbUser = async (OAuthEmail: string, OAuthName: string) => {
  await db.connect();
  const user = await UserModel.findOne({ email: OAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }

  const newUser = await UserModel.create({
    email: OAuthEmail,
    name: OAuthName,
    role: 'client',
    password: '@@@@@@@@@@',
  });
  await db.disconnect();
  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};
