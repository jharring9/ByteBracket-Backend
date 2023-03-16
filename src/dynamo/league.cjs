const {
  GetCommand,
  DeleteCommand,
  UpdateCommand,
  BatchGetCommand,
  QueryCommand,
  TransactWriteCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");
const { bracketTable } = require("./bracket.cjs");
const { redisClient } = require("../redisClient");

const leagueTable = "leagues";
const leagueBracketsTable = "league_brackets";
const userLeaguesTable = "user_leagues";
exports.leagueBracketsTable = leagueBracketsTable;
exports.userLeaguesTable = userLeaguesTable;

exports.getLeague = async (id, username) => {
  const leagueParams = {
    TableName: leagueTable,
    Key: {
      id: id,
    },
  };
  const userLeaguesParams = {
    TableName: userLeaguesTable,
    Key: {
      user: username,
      league: id,
    },
  };
  try {
    const { Item: league } = await ddbDocClient.send(
      new GetCommand(leagueParams)
    );
    const { Item: userLeagueObj } = await ddbDocClient.send(
      new GetCommand(userLeaguesParams)
    );
    if (userLeagueObj && userLeagueObj.allowedEntries > league.entriesPerUser) {
      league.entriesPerUser = userLeagueObj.allowedEntries;
    }
    return league;
  } catch (err) {
    return null;
  }
};

exports.saveLeague = async (league, userId) => {
  const now = new Date().toISOString();
  league.created = now;
  league.lastUpdated = now;
  const params = {
    TransactItems: [
      {
        Put: {
          TableName: leagueTable,
          Item: league,
        },
      },
      {
        Put: {
          TableName: userLeaguesTable,
          Item: {
            user: userId,
            league: league.id,
            allowedEntries: 0,
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

const addLeagueToUser = async (userId, leagueId) => {
  const params = {
    TableName: userLeaguesTable,
    Item: {
      user: userId,
      league: leagueId,
      allowedEntries: 0,
    },
  };
  try {
    return await ddbDocClient.send(new PutCommand(params));
  } catch {
    return true;
  }
};
exports.addLeagueToUser = addLeagueToUser;

exports.addEntryToLeague = async (leagueId, bracketId, userId) => {
  const leagueBracketsParams = {
    TableName: leagueBracketsTable,
    IndexName: "user-league-index",
    KeyConditionExpression: "#l = :l and #u = :u",
    Select: "COUNT",
    ExpressionAttributeValues: {
      ":l": leagueId,
      ":u": userId,
    },
    ExpressionAttributeNames: {
      "#l": "league",
      "#u": "user",
    },
  };
  const leagueParams = {
    TableName: leagueTable,
    Key: {
      id: leagueId,
    },
    ProjectionExpression: "entriesPerUser",
  };
  const userLeaguesParams = {
    TableName: userLeaguesTable,
    Key: {
      user: userId,
      league: leagueId,
    },
    ProjectionExpression: "allowedEntries",
  };
  const leagueBracketParams = {
    TableName: leagueBracketsTable,
    Item: {
      league: leagueId,
      bracket: bracketId,
      user: userId,
    },
  };

  try {
    const { Count: currentEntries } = await ddbDocClient.send(
      new QueryCommand(leagueBracketsParams)
    );
    const { Item: league } = await ddbDocClient.send(
      new GetCommand(leagueParams)
    );
    const { Item: userLeagueObj } = await ddbDocClient.send(
      new GetCommand(userLeaguesParams)
    );
    if (currentEntries >= league.entriesPerUser) {
      if (!userLeagueObj || currentEntries >= userLeagueObj.allowedEntries) {
        return {
          error:
            "You have reached the maximum number of entries for this league",
        };
      }
    }
    if (!userLeagueObj) await addLeagueToUser(userId, leagueId);
    return await ddbDocClient.send(new PutCommand(leagueBracketParams));
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
    UpdateExpression: "set #n = :n, #c = :c, #l = :l, lastUpdated = :u",
    ExpressionAttributeValues: {
      ":n": settings.name,
      ":c": settings.code,
      ":l": settings.lockDate,
      ":u": new Date().toISOString(),
    },
    ExpressionAttributeNames: {
      "#n": "name",
      "#c": "code",
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
    TableName: leagueBracketsTable,
    Key: {
      league: leagueId,
      bracket: bracketId,
    },
  };
  try {
    return await ddbDocClient.send(new DeleteCommand(params));
  } catch (err) {
    return null;
  }
};

exports.batchGetLeagues = async (leagues) => {
  const params = {
    RequestItems: {
      [leagueTable]: {
        Keys: leagues.map((obj) => ({
          id: obj.league || obj,
        })),
        AttributesToGet: ["id", "name", "managerId", "lockDate"],
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

exports.grantUserEntries = async (
  userId,
  leagueId,
  entries,
  currentLeagueEntries
) => {
  const userLeaguesParams = {
    TableName: userLeaguesTable,
    Key: {
      user: userId,
      league: leagueId,
    },
  };
  let newEntries;
  try {
    const { Item: userLeagueObj } = await ddbDocClient.send(
      new GetCommand(userLeaguesParams)
    );
    newEntries =
      Math.max(userLeagueObj.allowedEntries, currentLeagueEntries) + entries;
  } catch (err) {
    return { error: "User is not in league" };
  }
  const params = {
    TableName: userLeaguesTable,
    Key: {
      user: userId,
      league: leagueId,
    },
    UpdateExpression: "SET #a = :e",
    ExpressionAttributeNames: {
      "#a": "allowedEntries",
    },
    ExpressionAttributeValues: {
      ":e": newEntries,
    },
  };
  try {
    await ddbDocClient.send(new UpdateCommand(params));
    return newEntries;
  } catch (err) {
    return null;
  }
};

exports.getUserEntries = async (userId, leagueId) => {
  const params = {
    TableName: leagueBracketsTable,
    IndexName: "user-league-index",
    KeyConditionExpression: "#l = :l and #u = :u",
    ExpressionAttributeValues: {
      ":l": leagueId,
      ":u": userId,
    },
    ExpressionAttributeNames: {
      "#l": "league",
      "#u": "user",
    },
  };
  try {
    const { Items: userLeagues } = await ddbDocClient.send(
      new QueryCommand(params)
    );
    if (userLeagues.length === 0) return [];
    const bracketParams = {
      RequestItems: {
        [bracketTable]: {
          Keys: userLeagues.map((entry) => {
            return {
              username: entry.user,
              id: entry.bracket,
            };
          }),
          AttributesToGet: ["id", "username", "name", "winnerName"],
        },
      },
    };
    const { Responses } = await ddbDocClient.send(
      new BatchGetCommand(bracketParams)
    );
    return await Promise.all(
      Responses[bracketTable].map(async (bracket) => {
        bracket.points = await redisClient.zscore(
          leagueId,
          JSON.stringify({ user: userId, bracket: bracket.id })
        );
        bracket.rank =
          (await redisClient.zrevrank(
            leagueId,
            JSON.stringify({ user: userId, bracket: bracket.id })
          )) + 1;
        return bracket;
      })
    );
  } catch (err) {
    return null;
  }
};
