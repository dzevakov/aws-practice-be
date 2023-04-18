import { S3 } from "@aws-sdk/client-s3";
import csv from "csv-parser";
const BUCKET = process.env.importBucket;

const getObject = async (params) => {
  const s3 = new S3({ region: "us-east-1" });

  const s3ResponseStream = (await s3.getObject(params)).Body;
  const result = [];

  s3ResponseStream.pipe(csv()).on("data", (data) => {
    console.log("product data", data);
    result.push(data);
  }).on("end", () => {
    return result;
  });

};

export const importFileParser = async (event) => {
  const s3 = new S3({ region: "us-east-1" });

  try {
    for (const record of event.Records) {
      const s3Object = await getObject({
        Bucket: BUCKET,
        Key: record.s3.object.key,
      });

      await s3.copyObject({
        Bucket: BUCKET,
        CopySource: BUCKET + '/' + record.s3.object.key,
        Key: record.s3.object.key.replace('uploaded', 'parsed')
      })

      await s3.deleteObject({
        Bucket: BUCKET,
        Key: record.s3.object.key
      })
    }

    return {
      statusCode: 200,
    };
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Server error",
    };

    return response;
  }
};
