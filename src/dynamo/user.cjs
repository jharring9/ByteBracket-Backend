const {
  GetCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");
const { userLeaguesTable } = require("./league.cjs");

const userTable = "users";
exports.userTable = userTable;

exports.getUser = async (username) => {
  const userParams = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };
  try {
    const { Item: user } = await ddbDocClient.send(new GetCommand(userParams));
    user.leagues = (await getUserLeagues(username)).map((league) => league.league);
    return user;
  } catch (err) {
    return null;
  }
};

exports.saveUser = async (user) => {
  const now = new Date().toISOString();
  user.created = now;
  user.lastUpdated = now;
  const params = {
    TableName: userTable,
    Item: user,
  };
  try {
    return await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    return null;
  }
};

exports.updateUser = async (user) => {
  const params = {
    TableName: userTable,
    Key: {
      username: user.username,
    },
    UpdateExpression: "set email = :e, #f = :f, #l = :l, lastUpdated = :u",
    ExpressionAttributeValues: {
      ":e": user.email,
      ":f": user.first,
      ":l": user.last,
      ":u": new Date().toISOString(),
    },
    ExpressionAttributeNames: {
      "#f": "first",
      "#l": "last",
    },
  };
  try {
    return await ddbDocClient.send(new UpdateCommand(params));
  } catch (err) {
    return null;
  }
};

exports.updatePassword = async (username, password) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
    UpdateExpression: "set password = :p, lastUpdated = :u",
    ExpressionAttributeValues: {
      ":p": password,
      ":u": new Date().toISOString(),
    },
  };
  try {
    return await ddbDocClient.send(new UpdateCommand(params));
  } catch (err) {
    return null;
  }
};

exports.deleteUser = async (username) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };
  try {
    return await ddbDocClient.send(new DeleteCommand(params));
  } catch (err) {
    return null;
  }
};

const getUserLeagues = async (username) => {
  const params = {
    TableName: userLeaguesTable,
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeValues: {
      ":u": username,
    },
    ExpressionAttributeNames: {
      "#u": "user",
    },
  };
  try {
    const { Items: leagues } = await ddbDocClient.send(
      new QueryCommand(params)
    );
    return leagues;
  } catch (err) {
    return null;
  }
};
exports.getUserLeagues = getUserLeagues;
