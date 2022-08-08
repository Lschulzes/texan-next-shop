import formidable, { File } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppError } from '../../../utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return await uploadImage(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await parseFiles(req);

    return res.status(200).json({ message: 'Image uploaded' });
  } catch (error) {
    res.status((error as AppError).statusCode).send((error as AppError).message);
  }
};

const saveFile = async (file: File) => {
  //
};

const parseFiles = (req: NextApiRequest) => {
  return new Promise((res, rej) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log({ err, fields, files });
      if (err) return rej(err);

      await saveFile(files.file as File);
      res(true);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
