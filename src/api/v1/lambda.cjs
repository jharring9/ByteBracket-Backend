const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const { TEAMS, LOGOS, AP_RANKINGS } = require("../../BYTEBRACKET_CONFIG.js");

const client = new LambdaClient({ region: "us-east-1" });

module.exports = (app) => {
  app.get("/v1/logos", async (req, res) => {
    return res.send(LOGOS);
  });

  app.get("/v1/field", async (req, res) => {
    return res.send(generateField(null));
  });

  app.post("/v1/lambda", async (req, res) => {
    try {
      console.info("Invoking ByteBracket Lambda with request: ", req.body);
      const invokeLambda = async () => {
        const command = new InvokeCommand({
          FunctionName: "ComputeRankings",
          Payload: JSON.stringify(req.body),
        });
        const { Payload } = await client.send(command);
        let data = JSON.parse(Buffer.from(Payload).toString());
        let top25Schools = data["Schools"].slice(0, 25);
        let Ws = data["W"].slice(0, 25);
        let Ls = data["L"].slice(0, 25);
        let schools = data["Schools"];
        let percentiles = data["percentiles"];
        let s2p = {};
        schools.forEach((school, index) => {
          s2p[school] = percentiles[index];
        });
        data["field"] = generateField(s2p);
        data["top25"] = top25Schools.map((school, index) => {
          let r = AP_RANKINGS.has(school) ? AP_RANKINGS.get(school) : 26;
          return {
            team: school,
            rank: index + 1,
            W: Ws[index],
            L: Ls[index],
            apRank: r !== 26 ? r : "-",
            diff: r - (index + 1),
          };
        });
        return res.status(200).send(data);
      };
      invokeLambda().catch((error) => {
        console.error("Error invoking Lambda", error);
        return res.status(400).send("Error invoking ByteBracket Lambda.");
      });
    } catch (err) {
      console.error("Error invoking Lambda: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });
};

/**
 * Generate the field of teams for the bracket.
 */
const generateField = (s2p) => {
  return TEAMS.map((team, index) => ({
    name: team,
    seed: (index % 16) + 1,
    percentile: s2p ? s2p[team] : null,
  }));
};
