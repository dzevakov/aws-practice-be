import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const BUCKET = process.env.importBucket;

export const importProductsFile = async (event) => {
  try {
    const key = event.queryStringParameters.name;

    const putObjectParams = {
      Bucket: BUCKET,
      Key: `uploaded/${key}`,
    }

    const client = new S3Client({ region: "us-east-1" });
    const command = new PutObjectCommand(putObjectParams);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: url }),
    };
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Products weren't created",
    };

    return response;
  }
};
