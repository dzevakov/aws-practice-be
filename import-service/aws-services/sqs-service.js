import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const queueUrl = process.env.CATALOG_ITEM_QUEUE_URL;

export const sendMessage = async (data) => {
  try {
    const client = new SQSClient({ region: "us-east-1" });

    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(data),
    };

    const command = new SendMessageCommand(params);
    const response = await client.send(command);

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Server error during sending sqs message",
      error: error,
    };

    return response;
  }
};
