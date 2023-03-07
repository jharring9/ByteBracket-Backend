const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./ddbClient.cjs");
exports.ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});
