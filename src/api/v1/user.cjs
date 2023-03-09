const userDB = require("../../dynamo/user.cjs");
const bcrypt = require("bcryptjs");
const leagueDB = require("../../dynamo/league.cjs");
const {redisClient} = require("../../redisClient");

module.exports = (app) => {
  /**
   * Get user account.
   */
  app.get("/v1/user/:username", async (req, res) => {
    await redisClient.connect();
    redisClient.keys("*").then((err, keys) => {
        console.log(keys);
      console.log(err);
    });
    if (!req.session.user)
      return res.status(401).send({ error: "Unauthorized." });

    const dynamoUser = await userDB.getUser(req.params.username);
    if (dynamoUser?.username) {
      const response = {
        first: dynamoUser.first,
        last: dynamoUser.last,
        username: dynamoUser.username,
        email: dynamoUser.email,
        leagues: dynamoUser.leagues,
      };
      return res.send(response);
    }
    return res.status(404).send({ error: "User not found." });
  });

  /**
   * Create user account.
   */
  app.post("/v1/user", async (req, res) => {
    const { username, first, last, email, password } = req.body;
    if (!username || !password || !first || !last || !email) {
      return res.status(400).send({ error: "All fields required." });
    }
    const dynamoUser = await userDB.getUser(username);
    if (dynamoUser?.username) {
      return res.status(400).send({ error: "Username already in use." });
    }
    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
      username: username.toLowerCase(),
      first: first.trim(),
      last: last.trim(),
      email: email.toLowerCase(),
      password: encryptedPassword,
    };
    if (!(await userDB.saveUser(user))) {
      return res.status(503).send({ error: "Server error. Please try again." });
    }
    const response = {
      first: user.first,
      last: user.last,
      username: user.username,
      email: user.email,
      leagues: [],
    };
    req.session.user = response;
    res.status(201).send(response);
  });

  /**
   * Update user account.
   */
  app.put("/v1/user/:user", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const { first, last, email } = req.body;
    if (!first || !last || !email) {
      return res.status(400).send({ error: "All fields required." });
    }

    const updatedUser = {
      username: user,
      first: first.trim(),
      last: last.trim(),
      email: email.toLowerCase(),
    };

    if (!(await userDB.updateUser(updatedUser))) {
      return res.status(503).send({ error: "Server error. Please try again." });
    }

    const response = {
      first: updatedUser.first,
      last: updatedUser.last,
      username: user,
      email: updatedUser.email,
      leagues: [],
    };
    req.session.user = response;
    res.status(201).send(response);
  });

  /**
   * Update user password.
   */
  app.put("/v1/user/:user/password", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).send({ error: "All fields required." });
    }

    const dynamoUser = await userDB.getUser(user);
    if (!dynamoUser?.username) {
      return res.status(404).send({ error: "User not found." });
    }

    if (!bcrypt.compareSync(currentPassword, dynamoUser.password)) {
      return res.status(400).send({ error: "Incorrect current password." });
    }

    const encryptedPassword = bcrypt.hashSync(newPassword, 10);
    const result = await userDB.updatePassword(user, encryptedPassword);
    if (result) {
      return res.status(201).send();
    }
    return res.status(503).send({ error: "Server error. Please try again." });
  });

  /**
   * Delete a user account.
   */
  app.delete("/v1/user/:user", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const result = await userDB.deleteUser(user);
    if (result) {
      return res.status(204).send();
    }
    return res.status(404).send({ error: "Bracket not found" });
  });

  /**
   * Add league to user account.
   */
  app.post("/v1/user/:user/league", async (req, res) => {
    const { user } = req.params;
    const { leagueId } = req.body;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    const result = await leagueDB.addLeagueToUser(user, leagueId);
    if (result) {
      return res.status(201).send();
    }
    return res.status(400).send({ error: "Error adding league to user" });
  });
};
