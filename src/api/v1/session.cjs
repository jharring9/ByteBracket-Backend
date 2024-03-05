"use strict";

const userDB = require("../../dynamo/user.cjs");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  /**
   * Create user session.
   */
  app.post("/v1/session", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      console.debug("Missing fields in login: ", { username, password });
      return res.status(400).send({ error: "Both fields required." });
    }
    try {
      const dynamoUser = await userDB.getUser(username.toLowerCase());
      if (!dynamoUser?.username) {
        console.debug("Invalid username: ", username);
        return res.status(401).send({ error: "Invalid username or password." });
      }
      if (!bcrypt.compareSync(password, dynamoUser.password)) {
        console.debug("Invalid password: ", username);
        return res.status(401).send({ error: "Invalid username or password." });
      }
      const response = {
        first: dynamoUser.first,
        last: dynamoUser.last,
        username: dynamoUser.username,
        email: dynamoUser.email,
        leagues: Array.from(dynamoUser.leagues).filter((l) => l !== ""),
      };
      req.session.user = response;
      console.log("Session created: ", response);
      return res.status(201).send(response);
    } catch (err) {
      console.error("Error creating session: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Check if user session is valid/active.
   */
  app.get("/v1/session", async (req, res) => {
    if (!req.session.user) {
      console.info("No session found for requester.");
      return res.status(404).send({ error: "No session found." });
    }
    try {
      const dynamoUser = await userDB.getUser(req.session.user?.username);
      if (!dynamoUser) {
        return res.status(401).send({ error: "Invalid session." });
      }
      req.session.user.leagues = Array.from(dynamoUser.leagues || []).filter(
        (l) => l !== ""
      );
      console.info("Session found: ", req.session.user);
      res.status(200).send(req.session.user);
    } catch (err) {
      console.error("Error getting session: ", err);
      res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * End user session.
   */
  app.delete("/v1/session", (req, res) => {
    console.log("Session ended (logout) for user: ", req.session.user);
    req.session = null;
    return res.sendStatus(200);
  });
};
