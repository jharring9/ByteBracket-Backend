const {
  GetCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");

const userTable = "users";
exports.userTable = userTable;

exports.getUser = async (username) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };
  try {
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return Item;
  } catch (err) {
    return null;
  }
};

exports.saveUser = async (user) => {
  const now = new Date().toISOString();
  user.created = now;
  user.lastUpdated = now;
  user.leagues = new Set([""]);
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

exports.getUserLeagues = async (username) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
    AttributesToGet: ["leagues"],
  };
  try {
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    Item.leagues = Array.from(Item.leagues).filter((l) => l !== "");
    return Item;
  } catch (err) {
    return null;
  }
};

exports.addLeagueToUser = async (username, leagueId) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
    UpdateExpression: "add leagues :l",
    ExpressionAttributeValues: {
      ":l": new Set([leagueId]),
    },
  };
  try {
    return await ddbDocClient.send(new UpdateCommand(params));
  } catch (err) {
    return null;
  }
};
