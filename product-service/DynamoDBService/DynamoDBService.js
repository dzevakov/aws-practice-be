import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "./DynamoDBDocs.js";

export const putTransaction = async (items) => {
  const params = {
    TransactItems: items.map((item) => {
      return {
        Put: {
          Item: item.data,
          TableName: item.table,
        },
      };
    }),
  };
  try {
    const data = await ddbDocClient.send(new TransactWriteItemsCommand(params));

    return data;
  } catch (err) {
    const response = {
      statusCode: 500,
      message: err,
    };

    return response;
  }
};

export const putItem = async (item, table) => {
  const params = {
    TableName: table,
    Item: item,
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));

    return data;
  } catch (err) {
    const response = {
      statusCode: 500,
      message: "Server error",
    };

    return response;
  }
};

export const getList = async (table) => {
  try {
    const params = {
      TableName: table,
    };

    const data = await ddbDocClient.send(new ScanCommand(params));

    return data.Items;
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Server error",
    };

    return response;
  }
};

export const getItem = async (table, itemId) => {
  try {
    const params = {
      TableName: table,
      Key: {
        id: itemId,
      },
    };

    const data = await ddbDocClient.send(new GetCommand(params));

    return data.Item;
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Server error",
    };

    return response;
  }
};
