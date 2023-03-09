const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const {
  TEAMS,
  LOGOS,
  AP_RANKINGS,
  FIRST_FOUR,
} = require("../../BYTEBRACKET_CONFIG.js");

const client = new LambdaClient({ region: "us-east-1" });

module.exports = (app) => {
  app.get("/v1/logos", async (req, res) => {
    res.send(LOGOS);
  });

  app.get("/v1/field", async (req, res) => {
    res.send(generateField(null));
  });

  app.post("/v1/lambda", async (req, res) => {
    try {
      const invokeLambda = async () => {
        const command = new InvokeCommand({
          FunctionName: "ComputeRankings",
          Payload: JSON.stringify(req.body),
        });
        const { Payload } = await client.send(command);
        let data = JSON.parse(Buffer.from(Payload).toString());
        data = firstFourTransform(data);
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
          let r = school in AP_RANKINGS ? AP_RANKINGS[school] : 26;
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

const firstFourTransform = (lambdaData) => {
  FIRST_FOUR.forEach((teams) => {
    let ind1 = lambdaData["Schools"].indexOf(teams[0]);
    let ind2 = lambdaData["Schools"].indexOf(teams[1]);
    let new_p =
      (lambdaData["percentiles"][ind1] + lambdaData["percentiles"][ind2]) / 2;
    let W_Avg = (lambdaData["W"][ind1] + lambdaData["W"][ind2]) / 2;
    let L_Avg = (lambdaData["L"][ind1] + lambdaData["L"][ind2]) / 2;
    lambdaData["Schools"].push(
      `${lambdaData["Schools"][ind1]}/${lambdaData["Schools"][ind2]}`
    );
    lambdaData["percentiles"].push(new_p);
    lambdaData["W"].push(W_Avg);
    lambdaData["L"].push(L_Avg);
  });
  return lambdaData;
};
