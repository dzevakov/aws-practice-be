import { putTransaction } from "../DynamoDBService/DynamoDBService.js";
import { sendEmail } from "../aws-services/sns-service.js";

export const catalogBatchProcess = async (event) => {
  try {
    const productsTable = process.env.productsTable;
    const stocksTable = process.env.stockTable;
    const results = { succeed: 0, failed: [] };

    for (const { messageId, body } of event.Records) {
      const newProduct = JSON.parse(body);

      const newProductId = `bc-${Date.now()}`;
      const params = [
        {
          data: {
            description: { S: newProduct.description },
            id: { S: newProductId },
            price: { N: newProduct.price },
            title: { S: newProduct.title },
          },
          table: productsTable,
        },
        {
          data: {
            id: { S: newProductId },
            count: { N: newProduct.count.toString() },
          },
          table: stocksTable,
        },
      ];

      // Mocked request to put product in DB
      // const data = await putTransaction(params);
      const data = {$metadata: {httpStatusCode: 200}};

      if (data?.$metadata?.httpStatusCode === 200) {
        results.succeed += 1;
        const response = await sendEmail(
          `${newProduct.title} product was created`,
          newProduct.price
        );
      } else {
        results.failed.push(newProduct.title);
      }
    }

    const response = {
      statusCode: 200,
      body:
        (results.succeed > 0 &&
          `Successfully processed ${results.succeed} products.`) +
        (results.failed.length &&
          `Products: ${results.failed.join(
            ", "
          )} weren't successfully created`),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      message: "Server error",
    };

    return response;
  }
};
