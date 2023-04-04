import { MockDataService } from "../mocks/mockData.js";
import { getProductsList } from "../handlers/availableProducts.js";

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
  describe('when to call API by endpoint "/products"', () => {
    test("then it should return array of products", async () => {
      const response = await getProductsList();
      const mockedData = JSON.parse(response.body)

      expect(mockedData).toEqual([
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
      ]);
    });
  });
});
