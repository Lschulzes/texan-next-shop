import formidable, { File } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppError } from '../../../utils';
import { uploadImage } from './../../../services/S3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return await uploadImageToS3(req, res);
  }

  res.status(400).json({ message: 'route not found!' });
}

const uploadImageToS3 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await parseFiles(req);

    return res.status(200).json({ message: 'Image uploaded' });
  } catch (error) {
    res.status((error as AppError).statusCode).send((error as AppError).message);
  }
};

const saveFile = async (basePath: string, file: File) => {
  try {
    const blob = fs.readFileSync(file.filepath);
    const uploadedImage = await uploadImage(`${basePath}${file.originalFilename}`, blob);
    return uploadedImage.Location;
  } catch (error) {
    throw new AppError('Image upload failed', 500);
  }
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  const { path = '' } = req.query;
  return new Promise((res, rej) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) return rej(err);

      const href = await saveFile(`${path}`, files.file as File);
      res(href);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
