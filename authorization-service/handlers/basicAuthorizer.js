export const basicAuthorizer = async (event) => {
  if (!event.headers.authorization) {
    throw new Error("Unauthorized");
  }
  try {
    const { headers } = event;
    console.log("headers", headers);
    const encoded = headers.authorization.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();
    const password = decoded.split(":")[1];

    const response = {
      isAuthorized: process.env.dzevakov === password,
    };

    return response;
  } catch (error) {
    console.log("basicAuthorizer error", error);
    // return error
  }
};
