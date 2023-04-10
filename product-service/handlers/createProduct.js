import { putItem } from "../DynamoDBService/DynamoDBService.js";

export const createProduct = async (event) => {
  console.log("create product properties", JSON.parse(event.body));
  try {
    const productsTable = process.env.productsTable;
    const stocksTable = process.env.stockTable;
    const newProduct = JSON.parse(event.body);

    if (
      !(
        typeof newProduct.title === "string" &&
        typeof newProduct.price === "number" &&
        typeof newProduct.count === "number" &&
        typeof newProduct.description === "string"
      )
    ) {
      const response = {
        statusCode: 400,
        message: "Product data is invalid",
      };

      return response;
    }

    const newProductId = `bc-${Date.now()}`;
    // crypto.randomUUID()

    const productsResult = await putItem(
      {
        id: newProductId,
        description: newProduct.description,
        title: newProduct.title,
        price: newProduct.price,
      },
      productsTable
    );
    const stocksResult = await putItem(
      {
        id: newProductId,
        count: newProduct.count,
      },
      stocksTable
    );

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
