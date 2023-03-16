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

  // Create a map of entry ID to points
  const pointsMap = {};
  for (let i = 0; i < entries.length; i += 2) {
    const data = JSON.parse(entries[i]);
    pointsMap[data.bracket] = {
      points: entries[i + 1],
      user: data.user,
    };
  }

  const params = {
    RequestItems: {
      [bracketTable]: {
        Keys: Object.keys(pointsMap).map((bracketId) => {
          return {
            username: pointsMap[bracketId].user,
            id: bracketId,
          };
        }),
        AttributesToGet: ["id", "username", "name", "winnerName"],
      },
    },
  };
  try {
    const { Responses } = await ddbDocClient.send(new BatchGetCommand(params));
    return Responses[bracketTable].map((bracket) => {
      bracket.points = pointsMap[bracket.id].points;
      return bracket;
    });
  } catch (err) {
    return null;
  }
};

exports.getBracketLeagues = async (bracketId) => {
  const params = {
    TableName: "league_brackets",
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
