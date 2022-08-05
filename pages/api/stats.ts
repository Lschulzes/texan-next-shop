import type { NextApiRequest, NextApiResponse } from 'next';
import { getStats } from '../../database/db';

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await returnStats(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const returnStats = async (req: NextApiRequest, res: NextApiResponse) => {
  const stats = await getStats(req);

  return res.status(200).json({ stats });
};
