import { getList } from "../DynamoDBService/DynamoDBService.js";

export const getProductsList = async (event) => {
  try {
    const productsTable = process.env.productsTable;
    const stocksTable = process.env.stockTable;

    const productsList = await getList(productsTable);
    const stocksList = await getList(stocksTable);

    const availableProducts = {
      products: productsList,
      stocks: stocksList
    };

    const response = {
      statusCode: 200,
      body: JSON.stringify(availableProducts)
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
