const {
  GetCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
  ScanCommand,
  BatchGetCommand,
  TransactWriteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");
const { bracketTable } = require("./bracket.cjs");
const { userTable } = require("./user.cjs");

const leagueTable = "leagues";

exports.getLeague = async (id) => {
  const params = {
    TableName: leagueTable,
    Key: {
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

exports.saveLeague = async (league) => {
  const now = new Date().toISOString();
  league.created = now;
  league.lastUpdated = now;
  const params = {
    TableName: leagueTable,
    Item: league,
  };
  try {
    return await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    return null;
  }
};

exports.addEntryToLeague = async (leagueId, bracketId, userId) => {
  const params = {
    TransactItems: [
      {
        Update: {
          TableName: leagueTable,
          Key: {
            id: leagueId,
          },
          UpdateExpression: "ADD entries :e",
          ExpressionAttributeValues: {
            ":e": new Set([`${userId}#${bracketId}`]),
          },
        },
      },
      {
        Update: {
          TableName: bracketTable,
          Key: {
            username: userId,
            id: bracketId,
          },
          UpdateExpression: "ADD leagues :e",
          ExpressionAttributeValues: {
            ":e": new Set([leagueId]),
          },
        },
      },
      {
        Update: {
          TableName: userTable,
          Key: {
            username: userId,
          },
          UpdateExpression: "ADD leagues :l",
          ExpressionAttributeValues: {
            ":l": new Set([leagueId]),
          },
        },
      },
    ],
  };

  try {
    return await ddbDocClient.send(new TransactWriteCommand(params));
  } catch (err) {
    return null;
  }
};

exports.updateLeagueSettings = async (id, settings) => {
  const params = {
    TableName: leagueTable,
    Key: {
      id: id,
    },
    UpdateExpression:
      "set #n = :n, #c = :c, #m = :m, #e = :e, #l = :l, lastUpdated = :u",
    ExpressionAttributeValues: {
      ":n": settings.name,
      ":c": settings.code,
      ":m": settings.maxEntries,
      ":e": settings.entriesPerUser,
      ":l": settings.lockDate,
      ":u": new Date().toISOString(),
    },
    ExpressionAttributeNames: {
      "#n": "name",
      "#c": "code",
      "#m": "maxEntries",
      "#e": "entriesPerUser",
      "#l": "lockDate",
    },
  };
  try {
    return await ddbDocClient.send(new UpdateCommand(params));
  } catch (err) {
    return null;
  }
};

exports.removeEntryFromLeague = async (userId, leagueId, bracketId) => {
  const params = {
    TransactItems: [
      {
        Update: {
          TableName: leagueTable,
          Key: {
            id: leagueId,
          },
          UpdateExpression: "DELETE entries :e",
          ExpressionAttributeValues: {
            ":e": new Set([`${userId}#${bracketId}`]),
          },
        },
      },
      {
        Update: {
          TableName: bracketTable,
          Key: {
            username: userId,
            id: bracketId,
          },
          UpdateExpression: "DELETE leagues :e",
          ExpressionAttributeValues: {
            ":e": new Set([leagueId]),
          },
        },
      },
    ],
  };

  try {
    return await ddbDocClient.send(new TransactWriteCommand(params));
  } catch (err) {
    return null;
  }
};

exports.deleteLeague = async (id) => {
  const params = {
    TableName: leagueTable,
    Key: {
      id: id,
    },
  };
  try {
    return await ddbDocClient.send(new DeleteCommand(params));
  } catch (err) {
    return null;
  }
};

exports.scanLeagues = async () => {
  const params = {
    TableName: leagueTable,
    FilterExpression: "isPrivate = :false",
    ExpressionAttributeValues: {
      ":false": false,
    },
    ProjectionExpress: "id, entries, name, managerId, lockDate",
  };
  try {
    const { Items } = await ddbDocClient.send(new ScanCommand(params));
    return Items;
  } catch (err) {
    return null;
  }
};

exports.batchGetLeagues = async (leagues) => {
  const params = {
    RequestItems: {
      [leagueTable]: {
        Keys: leagues.map((id) => ({
          id: id,
        })),
        AttributesToGet: ["id", "entries", "name", "managerId", "lockDate"],
      },
    },
  };
  try {
    const { Responses } = await ddbDocClient.send(new BatchGetCommand(params));
    return Responses[leagueTable];
  } catch (err) {
    return null;
  }
};
