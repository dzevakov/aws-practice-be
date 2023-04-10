import { getItem } from "../DynamoDBService/DynamoDBService.js";

export const getProduct = async (event) => {
  try {
    const itemID = event.pathParameters.itemId;
    const productsTable = process.env.productsTable;
    const stocksTable = process.env.stockTable;
    
    const product = await getItem(productsTable, itemID);
    const productInStock = await getItem(stocksTable, itemID);

    const item = {
      ...product,
      count: productInStock.count
    }
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' }
    };
  
    return response;

  } catch (error) {
      const response = {
      statusCode: 500,
      message: "Product not found",
    }
    
    return response;
  }
};
