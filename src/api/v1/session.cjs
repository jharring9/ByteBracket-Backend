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
      return res.status(400).send({ error: "Both fields required." });
    }
    try {
      const dynamoUser = await userDB.getUser(username.toLowerCase());
      if (!dynamoUser?.username) {
        return res.status(401).send({ error: "Invalid username or password." });
      }
      if (!bcrypt.compareSync(password, dynamoUser.password)) {
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
      res.status(201).send(response);
    } catch (err) {
      console.error("Error creating session: ", err);
      res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Check if user session is valid/active.
   */
  app.get("/v1/session", async (req, res) => {
    if (!req.session.user) {
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
    req.session = null;
    res.sendStatus(200);
  });
};
