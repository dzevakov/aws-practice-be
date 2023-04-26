import { putTransaction } from "../DynamoDBService/DynamoDBService.js";

export const createProduct = async (event) => {
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

    const params = [
      {
        data: {
          description: {S: newProduct.description},
          id: {S: newProductId},
          price: {N: newProduct.price.toString()},
          title: {S: newProduct.title},
        },
        table: productsTable
      },
      {
        data: {
          id: {S: newProductId},
          count: {N: newProduct.count.toString()},
        },
        table: stocksTable
      },
    ]

    const data = await putTransaction(params);

    const response = {
      statusCode: 200,
      body: JSON.stringify({statusCode: data.$metadata.httpStatusCode}),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Products wasn't created",
    };

    return response;
  }
};
