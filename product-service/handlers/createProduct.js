import { putItem } from "../DynamoDBService/DynamoDBService.js";

export const createProduct = async (event) => {
  try {
    const productsTable = process.env.productsTable;
    const stocksTable = process.env.stockTable;
    const newProduct = JSON.parse(event.body);
    const newProductId = `bc-${Date.now()}`;
    // crypto.randomUUID()

    const productsResult = await putItem({
      id: newProductId,
      description: newProduct.description,
      title: newProduct.title,
      price: newProduct.price,
    }, productsTable);
    const stocksResult = await putItem({
      id: newProductId,
      count: newProduct.count,
    }, stocksTable);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        productsResult: {
          statusCode: productsResult.$metadata.httpStatusCode,
        },
        stocksResult: {
          statusCode: stocksResult.$metadata.httpStatusCode,
        },
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Products list not found",
    };

    return response;
  }
};
