import { putItem } from "../product-service/DynamoDBService/DynamoDBService.js";
import { products, stocks } from "../product-service/mocks/mockData.js";

function fillTables() {
  products.forEach((product) => putItem(product, 'bicycle_shop_products'));
  stocks.forEach((stock) => putItem(stock, 'bicycle_shop_stock'));
}

fillTables();
