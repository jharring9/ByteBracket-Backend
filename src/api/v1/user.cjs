const userDB = require("../../dynamo/user.cjs");
const bcrypt = require("bcryptjs");
const leagueDB = require("../../dynamo/league.cjs");

module.exports = (app) => {
  /**
   * Get user account.
   */
  app.get("/v1/user/:username", async (req, res) => {
    if (!req.session.user)
      console.debug("Unauthorized user trying to access account info");
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
      console.info("User data retrieved: ", response);
      return res.send(response);
    }
    console.debug("User not found: ", req.params.username);
    return res.status(404).send({ error: "User not found." });
  });

  /**
   * Create user account.
   */
  app.post("/v1/user", async (req, res) => {
    const { username, first, last, email, password } = req.body;
    if (!username || !password || !first || !last || !email) {
      console.debug("Missing fields in user creation: ", req.body);
      return res.status(400).send({ error: "All fields required." });
    }
    const dynamoUser = await userDB.getUser(username);
    if (dynamoUser?.username) {
      console.debug("Username already in use: ", username);
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
      console.log("Error saving user: ", user);
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
    console.info("User created: ", response);
    return res.status(201).send(response);
  });

  /**
   * Update user account.
   */
  app.put("/v1/user/:user", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      console.debug(
        "Unauthorized user %s trying to update account info for %s: ",
        sessionUser,
        user
      );
      return res.status(401).send({ error: "unauthorized" });
    }

    const { first, last, email } = req.body;
    if (!first || !last || !email) {
      console.debug("Missing fields in user update: ", req.body);
      return res.status(400).send({ error: "All fields required." });
    }

    const updatedUser = {
      username: user,
      first: first.trim(),
      last: last.trim(),
      email: email.toLowerCase(),
    };

    if (!(await userDB.updateUser(updatedUser))) {
      console.error("Error updating user: ", updatedUser);
      return res.status(503).send({ error: "Server error. Please try again." });
    }

    const response = {
      first: updatedUser.first,
      last: updatedUser.last,
      username: user,
      email: updatedUser.email,
      leagues: req.session.user.leagues,
    };
    req.session.user = response;
    console.info("User updated: ", response);
    return res.status(201).send(response);
  });

  /**
   * Update user password.
   */
  app.put("/v1/user/:user/password", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      console.debug(
        "Unauthorized user %s trying to update password for %s: ",
        sessionUser,
        user
      );
      return res.status(401).send({ error: "unauthorized" });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      console.debug("Missing fields in password update");
      return res.status(400).send({ error: "All fields required." });
    }

    const dynamoUser = await userDB.getUser(user);
    if (!dynamoUser?.username) {
      console.debug("User not found for password update: ", user);
      return res.status(404).send({ error: "User not found." });
    }

    if (!bcrypt.compareSync(currentPassword, dynamoUser.password)) {
      console.debug("Incorrect current password for user: ", user);
      return res.status(400).send({ error: "Incorrect current password." });
    }

    const encryptedPassword = bcrypt.hashSync(newPassword, 10);
    const result = await userDB.updatePassword(user, encryptedPassword);
    if (result) {
      console.info("Password updated for user: ", user);
      return res.status(201).send();
    }
    console.error("Error updating password for user: ", user);
    return res.status(503).send({ error: "Server error. Please try again." });
  });

  /**
   * Delete a user account.
   */
  app.delete("/v1/user/:user", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      console.debug(
        "Unauthorized user %s trying to delete account for %s: ",
        sessionUser,
        user
      );
      return res.status(401).send({ error: "unauthorized" });
    }

    const result = await userDB.deleteUser(user);
    if (result) {
      req.session.destroy();
      console.info("User deleted: ", user);
      return res.status(204).send();
    }
    console.error("Error deleting user: ", user);
    return res.status(404).send({ error: "User not found" });
  });

  /**
   * Add league to user account.
   */
  app.post("/v1/user/:user/league", async (req, res) => {
    const { user } = req.params;
    const { leagueId } = req.body;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      console.debug(
        "Unauthorized user %s trying to add league to %s: ",
        sessionUser,
        user
      );
      return res.status(401).send({ error: "unauthorized" });
    }
    const result = await leagueDB.addLeagueToUser(user, leagueId);
    if (result) {
      console.info("League added to user: ", { user, leagueId });
      return res.status(201).send();
    }
    console.error("Error adding league to user: ", { user, leagueId });
    return res.status(400).send({ error: "Error adding league to user" });
  });
};
