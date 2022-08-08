import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { UserModel } from './../../../models/UserModel';
import { AppError, handleMultipleMongooseErrors } from './../../../utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getUsers(res);
    case 'PUT':
      return await updateUser(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const getUsers = async (res: NextApiResponse) => {
  await db.connect();
  const users = await UserModel.find();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId = '', role = '' } = req.body;

    if (!isValidObjectId(userId)) throw new AppError('User id invalid', 400);

    await db.connect();
    const user = await UserModel.findById(userId);
    if (user) user.role = role;
    await user?.save();
    await db.disconnect();

    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    const appError = handleMultipleMongooseErrors(error);

    res.status(appError.statusCode).json(appError.message);
  }
};
