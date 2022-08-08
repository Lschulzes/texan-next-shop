import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export const uploadImage = async (Key: string, blob: Buffer) =>
  await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key,
      Body: blob,
    })
    .promise();
