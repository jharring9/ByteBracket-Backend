const leagueDB = require("../../dynamo/league.cjs");
const bracketDB = require("../../dynamo/bracket.cjs");
const userDB = require("../../dynamo/user.cjs");
const { v4: uuidv4 } = require("uuid");
const { redisClient } = require("../../redisClient");

module.exports = (app) => {
  /**
   * Create a new league.
   */
  app.post("/v1/league", async (req, res) => {
    const sessionUser = req.session.user?.username;
    if (!sessionUser) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const id = uuidv4();
      const { name, entriesPerUser, code, lockDate } = req.body;
      if (!name || !entriesPerUser || !lockDate || code.trim().length === 0) {
        return res.status(400).send({
          error:
            "Missing fields. This is likely a server issue. Please refresh the page and try again.",
        });
      }
      const newLeague = {
        id: id,
        name: name,
        entriesPerUser: entriesPerUser,
        isPrivate: true,
        code: code,
        managerId: sessionUser,
        lockDate: lockDate,
      };
      if (!(await leagueDB.saveLeague(newLeague, sessionUser))) {
        return res
          .status(503)
          .send({ error: "Server error. Please try again." });
      }
      res.status(201).send({ id: id });
    } catch (err) {
      console.error("Error posting new league: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Get a specific league by id.
   */
  app.get("/v1/league/:id", async (req, res) => {
    const { id } = req.params;
    if (!req.session.user?.username) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const result = await leagueDB.getLeague(id, req.session.user?.username);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send({ error: "League not found" });
    } catch (err) {
      console.error("Error getting league: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Get the top entries for a league.
   */
  app.get("/v1/league/:id/top", async (req, res) => {
    const { id } = req.params;
    if (!req.session.user?.username) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const topEntries = await redisClient.zrevrange(id, 0, 24, "WITHSCORES");
      if (topEntries) {
        const brackets = await bracketDB.batchGetBrackets(topEntries);
        return res.status(200).send(brackets);
      }
      return res.status(404).send({ error: "League not found" });
    } catch (err) {
      console.error("Error getting league: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Get user's entries for a league.
   */
  app.get("/v1/league/:id/my", async (req, res) => {

  });

  /**
   * Scan for all public leagues.
   */
  app.get("/v1/leagues/public", async (req, res) => {
    const user = req.session.user?.username;
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const leagues = await redisClient.smembers("publicleagues");
      if (!leagues) {
        return res.status(200).send([]);
      }
      const result = await leagueDB.batchGetLeagues(leagues);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(200).send([]);
    } catch (err) {
      console.error("Error getting public leagues: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Get all leagues associated with a user.
   */
  app.get("/v1/leagues/my", async (req, res) => {
    const user = req.session.user?.username;
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      let leagues = await userDB.getUserLeagues(user);
      if (!leagues) {
        return res.status(200).send([]);
      }
      const result = await leagueDB.batchGetLeagues(leagues);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(200).send([]);
    } catch (err) {
      console.error("Error getting user leagues: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Add a bracket to a league.
   */
  app.post("/v1/league/:id", async (req, res) => {
    const user = req.session.user?.username;
    const { id } = req.params;
    const { bracketId } = req.body;
    if (!bracketId) {
      return res.status(400).send({ error: "Invalid request" });
    }
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const result = await leagueDB.addEntryToLeague(id, bracketId, user);
      await redisClient.zadd(id, [
        0,
        JSON.stringify({ user: user, bracket: bracketId }),
      ]);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(500).send({ error: "Error adding entry to league" });
    } catch (err) {
      console.error("Error adding entry to league: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Delete a bracket from a league.
   */
  app.delete("/v1/league/:leagueId/:bracketId", async (req, res) => {
    const user = req.session.user?.username;
    const { leagueId, bracketId } = req.params;
    if (!leagueId || !bracketId) {
      return res.status(400).send({ error: "Invalid request" });
    }
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const result = await leagueDB.removeEntryFromLeague(
        user,
        leagueId,
        bracketId
      );
      await redisClient.zrem(
        leagueId,
        JSON.stringify({ user, bracket: bracketId })
      );
      if (result) {
        return res.sendStatus(204);
      }
      return res
        .status(500)
        .send({ error: "Error removing entry from league" });
    } catch (err) {
      console.error("Error removing entry from league: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Update league settings.
   */
  app.put("/v1/league/:id", async (req, res) => {
    const user = req.session.user?.username;
    const { id } = req.params;
    const { name, code, lockDate } = req.body;
    if (!name || !lockDate) {
      return res.status(400).send({ error: "Missing fields" });
    }
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    const settings = {
      name: name,
      code: code,
      lockDate: lockDate,
    };
    try {
      const result = await leagueDB.updateLeagueSettings(id, settings);
      if (result) {
        return res.sendStatus(201);
      }
      return res.status(400).send({ error: "Error updating league settings." });
    } catch (err) {
      console.error("Error updating league settings: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Grant entries to a user in a league.
   */
  app.put("/v1/league/:league/grant/:username", async (req, res) => {
    const sessionUser = req.session.user?.username;
    const { league, username } = req.params;
    const { amountChange, currentLeagueEntries } = req.body;
    if (!league || !username || !amountChange || !currentLeagueEntries) {
      return res.status(400).send({ error: "Missing fields" });
    }
    if (!sessionUser) {
      return res.status(401).send({ error: "unauthorized" });
    }
    const response = await leagueDB.grantUserEntries(
      username,
      league,
      amountChange,
      currentLeagueEntries
    );
    if (response.error) {
      return res.status(400).send({ error: response.error });
    } else if (response) {
      return res.status(201).send({ newEntries: response });
    }
    return res.status(500).send({ error: "Server error. Please try again." });
  });
};
