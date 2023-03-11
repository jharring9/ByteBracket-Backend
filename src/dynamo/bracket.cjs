const {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
  BatchGetCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");
const { leagueBracketsTable } = require("./league.cjs");

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
  if (entries.length === 0) return [];
  const brackets = entries.filter((e, i) => i % 2 === 0);
  const points = entries.filter((e, i) => i % 2 === 1);
  const params = {
    RequestItems: {
      [bracketTable]: {
        Keys: brackets.map((entry) => {
          const data = JSON.parse(entry);
          return {
            username: data.user,
            id: data.bracket,
          };
        }),
        AttributesToGet: ["id", "username", "name", "winnerName"],
      },
    },
  };
  try {
    const { Responses } = await ddbDocClient.send(new BatchGetCommand(params));
    return Responses[bracketTable].map((bracket, index) => {
      bracket.points = points[index];
      return bracket;
    });
  } catch (err) {
    return null;
  }
};

exports.getBracketLeagues = async (bracketId) => {
  const params = {
    TableName: leagueBracketsTable,
    IndexName: "bracket-index",
    KeyConditionExpression: "#b = :b",
    ExpressionAttributeNames: {
      "#b": "bracket",
    },
    ExpressionAttributeValues: {
      ":b": bracketId,
    },
    ProjectionExpression: "league",
  };
  try {
    const { Items: leagueList } = await ddbDocClient.send(
      new QueryCommand(params)
    );
    return leagueList;
  } catch (err) {
    console.log(err);
    return null;
  }
};
