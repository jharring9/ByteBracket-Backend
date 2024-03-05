const bracketDB = require("../../dynamo/bracket.cjs");
const leagueDB = require("../../dynamo/league.cjs");
const { v4: uuidv4 } = require("uuid");
const { redisClient } = require("../../redisClient");

module.exports = (app) => {
  /**
   * Create a new bracket.
   */
  app.post("/v1/:user/bracket", async (req, res) => {
    const sessionUser = req.session.user?.username;
    const queryUser = req.params.user;
    if (sessionUser !== queryUser) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const id = uuidv4();
      const { bracket, champion, name, winner, stats } = req.body;
      if (!name) {
        return res.status(400).send({ error: "Missing bracket name" });
      }
      if (!bracket || typeof champion !== "number" || !winner || !stats) {
        console.error("Missing fields: ", { bracket, champion, winner, stats });
        return res.status(400).send({
          error: "Missing fields. This is likely a server issue.",
        });
      }
      if (
        !(await bracketDB.saveBracket(
          sessionUser,
          id,
          bracket,
          champion,
          name,
          winner,
          stats
        ))
      ) {
        return res
          .status(503)
          .send({ error: "Server error. Please try again." });
      }
      return res.status(201).send({ id: id });
    } catch (err) {
      console.error("Error posting new bracket: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Get a user's specific bracket by id.
   */
  app.get("/v1/:user/bracket/:id", async (req, res) => {
    const { user, id } = req.params;
    try {
      const result = await bracketDB.getBracket(user, id);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send({ error: "Bracket not found" });
    } catch (err) {
      console.error("Error getting user bracket: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Get all brackets associated with a user.
   */
  app.get("/v1/:user/brackets", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const result = await bracketDB.getUserBrackets(user);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send({ error: "User not found" });
    } catch (err) {
      console.error("Error getting user brackets: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });

  /**
   * Delete a bracket by id.
   */
  app.delete("/v1/:user/bracket/:id", async (req, res) => {
    const { user, id } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    try {
      const leagueList = await bracketDB.getBracketLeagues(id);
      for (const league of leagueList) {
        await leagueDB.removeEntryFromLeague(user, league.league, id);
        await redisClient.zrem(
          league.league,
          JSON.stringify({ user, bracket: id })
            .replace(/":"/g, '": "')
            .replace(/","/g, '", "')
        );
      }
      const result = await bracketDB.deleteBracket(user, id);
      if (result) {
        return res.status(204).send();
      }
      return res.status(404).send({ error: "Bracket not found" });
    } catch (err) {
      console.error("Error deleting bracket: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });
};
