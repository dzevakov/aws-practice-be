import { MockDataService } from '../mocks/mockData.js';

export const getProduct = async (event) => {
  try {
    const mockData = await MockDataService.getData();

    const itemID = event.pathParameters.itemId;
    const product = mockData.filter(item => item.id === itemID);
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(product[0]),
      headers: { 'Content-Type': 'application/json' }
    };
  
    return response;

  } catch (error) {
      const response = {
      statusCode: 500,
      message: "Product not found"
    }
    
    return response;
  }
};
