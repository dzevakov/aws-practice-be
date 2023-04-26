import  { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
const topicArn = process.env.TOPIC_ARN;

export const sendEmail = async (message, price) => {
  try {
    const client = new SNSClient({ region: "us-east-1" });

    const params = {
      TopicArn: topicArn,
      Message: message,
      MessageAttributes: {
        price: {
          DataType: "Number",
          StringValue: price,
        }
      }
    };

    const command = new PublishCommand(params);
    const response = await client.send(command);

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Server error during sending sns message",
      error: error,
    };

    return response;
  }
};
