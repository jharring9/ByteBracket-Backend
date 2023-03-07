const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
exports.ddbClient = new DynamoDBClient({ region: "us-east-1" });
