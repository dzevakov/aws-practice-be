import { MockDataService } from "../mocks/mockData.js";
import { getProduct } from "../handlers/product.js";

jest.spyOn(MockDataService, "getData").mockImplementation(() => {
  return [
    {
      description: "Gravel Bike - glossy metallic midnight blue",
      id: "bc-1",
      price: 2400,
      title: "Bombtrack",
      count: 1,
    },
    {
      description: "KATHMANDU HYBRID - grey / silver",
      id: "bc-2",
      price: 3540,
      title: "CUBE",
      count: 1,
    },
  ];
});

describe("availableProducts", () => {
  describe('when to call API by endpoint "/products/{itemId}"', () => {
    test("then it should return specific product by provided 'itemId'", async () => {
      const response = await getProduct({ pathParameters: { itemId: "bc-2" } });
      const mockedData = JSON.parse(response.body);

      expect(mockedData).toEqual({
        description: "KATHMANDU HYBRID - grey / silver",
        id: "bc-2",
        price: 3540,
        title: "CUBE",
        count: 1,
      });
    });
  });
});
