import { MockDataService } from '../mocks/mockData.js';

export const getProductsList = async (event) => {
  try {
    const mockData = await MockDataService.getData();

    const response = {
      statusCode: 200,
      body: JSON.stringify(mockData)
    };
  
    return response;

  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Products list not found"
    }
    
    return response;
  }
};
