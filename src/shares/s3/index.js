// require('dotenv').config()
// const fs = require('fs')
// const S3 = require('aws-sdk/clients/s3')
import dotenv from "dotenv";
dotenv.config();
import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
export const uploadFile = (file, fileName) => {
  const buf = Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const uploadParams = {
    Bucket: bucketName,
    Body: buf,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${fileName.split(".")[1]}`,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
};

// downloads a file from s3
export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).promise();
};

// export const upLoadImage = {
//   getFileStream,
//   uploadFile,
// };
