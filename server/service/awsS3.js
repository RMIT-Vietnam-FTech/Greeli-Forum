import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv/config";

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const s3ClientObject = {
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
};
const s3Client = new S3Client(s3ClientObject);
// console.log(uploadParams);
// console.log(s3ClientObject);

export function uploadFileData(fileBuffer, fileName, mimetype) {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
    };
    return s3Client.send(new PutObjectCommand(uploadParams));
  } catch (e) {
    console.error(e.message);
  }
}

export function deleteFileData(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}
