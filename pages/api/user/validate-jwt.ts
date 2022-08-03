import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { AppError } from '../../../utils/errors';
import { UserModel } from './../../../models/UserModel';
import { getIdFromToken } from './../../../utils/jwt';

type Data = {
  message?: string;
  status: 'success' | 'failed';
  token?: string;
  user?: Pick<IUser, '_id' | 'email' | 'role' | 'name'>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return await validateJWT(req, res);
  }

  res.status(400).json({ message: 'route not found!', status: 'failed' });
}

const validateJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token } = req.cookies;

  if (!token) return res.status(500).json({ message: '', status: 'failed' });

  try {
    const _id = await getIdFromToken(token);
    await db.connect();
    const user = await UserModel.findById(_id).select('_id name role email');
    await db.disconnect();

    if (!user) throw new AppError('No user with such id', 404);

    return res.status(200).json({ user, status: 'success' });
  } catch (error) {
    return res
      .status((error as AppError).statusCode)
      .json({ message: (error as AppError)?.message || '', status: 'failed' });
  }
};
