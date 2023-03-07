const {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
  BatchGetCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");

const bracketTable = "brackets";
exports.bracketTable = bracketTable;

exports.getBracket = async (username, id) => {
  const params = {
    TableName: bracketTable,
    Key: {
      username: username,
      id: id,
    },
  };
  try {
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return Item;
  } catch (err) {
    return null;
  }
};

exports.getUserBrackets = async (username) => {
  const params = {
    TableName: bracketTable,
    KeyConditionExpression: "username = :a",
    ExpressionAttributeValues: {
      ":a": username,
    },
  };
  try {
    const { Items } = await ddbDocClient.send(new QueryCommand(params));
    return Items;
  } catch (err) {
    return null;
  }
};

exports.saveBracket = async (
  username,
  id,
  bracket,
  champion,
  name,
  winnerName,
  stats
) => {
  const now = new Date().toISOString();
  const params = {
    TableName: bracketTable,
    Item: {
      bracket: bracket,
      champion: champion,
      username: username,
      id: id,
      name: name,
      winnerName: winnerName,
      stats: stats,
      points: 0,
      leagues: new Set([""]),
      created: now,
      lastUpdated: now,
    },
  };
  try {
    return await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    return null;
  }
};

exports.deleteBracket = async (username, id) => {
  const params = {
    TableName: bracketTable,
    Key: {
      username: username,
      id: id,
    },
  };
  try {
    return await ddbDocClient.send(new DeleteCommand(params));
  } catch (err) {
    return null;
  }
};

exports.batchGetBrackets = async (entries) => {
  const params = {
    RequestItems: {
      [bracketTable]: {
        Keys: entries.map((entry) => ({
          username: entry.username,
          id: entry.bracketId,
        })),
        AttributesToGet: ["id", "username", "name", "winnerName", "points"],
      },
    },
  };
  try {
    const { Responses } = await ddbDocClient.send(new BatchGetCommand(params));
    return Responses[bracketTable];
  } catch (err) {
    return null;
  }
};

