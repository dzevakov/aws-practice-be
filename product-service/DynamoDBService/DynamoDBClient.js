import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({ region: "us-east-1" });
