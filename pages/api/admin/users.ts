import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { UserModel } from './../../../models/UserModel';
import { AppError } from './../../../utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getUsers(req, res);
    case 'PUT':
      return await updateUser(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(400).json({ message: 'route not found!' });
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId = '', role = '' } = req.body;

  if (!isValidObjectId(userId)) throw new AppError('User id invalid', 401);

  await db.connect();
  const user = await UserModel.findById(userId);
  if (user) user.role = role;
  await user?.save();
  await db.disconnect();

  res.status(200).json({ message: 'User updated' });
};
